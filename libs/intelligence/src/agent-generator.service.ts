import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { INTELLIGENCE_PROMPTS } from './prompts/intelligence.prompts';

@Injectable()
export class AgentGeneratorService {

  private readonly logger = new Logger(AgentGeneratorService.name);
  private ai: GoogleGenAI;

  constructor() {
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
      };
      const langKey = langMap[langCode.toUpperCase()] || 'Spanish';
      const promptTemplate = INTELLIGENCE_PROMPTS[langKey].identityGeneration;
      const promptText = promptTemplate.replace('{langCode}', langCode);
      const model = this.ai.models.generateContent({
        model: 'gemini-2.0-flash-lite',
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
      return {
        ...data,
        userId,
      };
    } catch (error) {
      this.logger.error('Error generating identity via Gemini catalog', error);
      throw error;
    }
  }

}
