import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { AgentEntity } from 'obai/entities';
import { INTELLIGENCE_PROMPTS } from './prompts/intelligence.prompts';

@Injectable()
export class AiIntelligenceService {

  private readonly logger = new Logger(AiIntelligenceService.name);
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env['GEMINI_API_KEY'],
    });
  }

  async analyzeContext(context: string, agent: AgentEntity): Promise<string | undefined> {
    try {
      const langKey = agent.language as keyof typeof INTELLIGENCE_PROMPTS;
      const promptData = INTELLIGENCE_PROMPTS[langKey] || INTELLIGENCE_PROMPTS.Spanish;
      const promptText = promptData.analysisInstruction(agent) + `\n\nCONTEXT: ${context}`;
      const result = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: [
          {
            role: 'user',
            parts: [{ text: promptText }],
          },
        ],
      });
      return result.text || '';
    } catch (error) {
      this.logger.error(`Error in Gemini analysis for ${agent.name}`, error);
      throw error;
    }
  }

}
