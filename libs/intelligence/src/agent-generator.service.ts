import { HttpException, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { I18nService } from 'nestjs-i18n';
import { INTELLIGENCE_PROMPTS } from './prompts/intelligence.prompts';

@Injectable()
export class AgentGeneratorService {

  private readonly logger = new Logger(AgentGeneratorService.name);
  private ai: GoogleGenAI;

  constructor(private readonly i18n: I18nService) {
    this.ai = new GoogleGenAI({
      apiKey: process.env['GEMINI_API_KEY'],
    });
  }

  async generateRandomAgent(userId: string, langCode: string = 'ES') {
    try {
      const langMap: Record<string, keyof typeof INTELLIGENCE_PROMPTS> = {
        ES: 'Spanish',
        EN: 'English',
        KR: 'Korean',
        KO: 'Korean',
        KA: 'Korean',
      };
      const langKey = langMap[langCode.toUpperCase()] || 'Spanish';
      const promptTemplate = INTELLIGENCE_PROMPTS[langKey].identityGeneration;
      const promptText = promptTemplate.replace('{langCode}', langCode);
      const model = this.ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: promptText }],
          },
        ],
      });
      const response = await model;
      const responseText = response.text || '';
      if (!responseText) {
        throw new Error('AI response was empty');
      }
      const data = JSON.parse(responseText.replace(/```json|```/g, '').trim());
      
      // Mapping for consistency with Prisma and Frontend
      const behaviors = data.behaviors || data.behavior || [];
      const description = data.description || (Array.isArray(behaviors) ? behaviors.join('. ') : '');

      return {
        ...data,
        behaviors,
        description,
        userId,
      };
    } catch (error: any) {
      // Extract status code if possible
      let status = error.status;
      if (!status && error.message) {
        try {
          const match = error.message.match(/\{.*\}/);
          if (match) {
            const parsed = JSON.parse(match[0]);
            status = parsed.error?.code || parsed.code;
          }
        } catch { /* ignore parse error */ }
      }

      if (status === 503 || error.message?.includes('503') || error.message?.includes('high demand')) {
        this.logger.warn('Gemini API is overloaded (503). Sending friendly message to frontend.');
        throw new ServiceUnavailableException(
          this.i18n.t('common.errors.ai_high_demand')
        );
      }

      this.logger.error('Error generating identity via Gemini catalog', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        this.i18n.t('common.errors.ai_technical_error'),
        500
      );
    }
  }

}
