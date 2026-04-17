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
      const promptData = INTELLIGENCE_PROMPTS['Spanish'];
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

  async generateChatResponse(userId: string, history: any[], agent: AgentEntity): Promise<string> {
    try {
      const chatHistory = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      const systemInstruction = `You are ${agent.name}. 
      Your gender: ${agent.gender}.
      Your maturity: ${agent.maturity}.
      Your personality: ${agent.personality}. 
      Your description: ${agent.description}. 
      Your behaviors: ${agent.behaviors.join(', ')}.
      Always respond in the same language as the user. Stay in character at all times.`;

      const result = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: chatHistory,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      return result.text || '...';
    } catch (error) {
      this.logger.error(`Error in Gemini chat for ${agent.name}`, error);
      return `[System Error] I'm having trouble thinking right now.`;
    }
  }
}
