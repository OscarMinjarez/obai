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
        model: 'gemini-3.1-flash-lite-preview',
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

  async generateChatResponse(userId: string, history: any[], agent: AgentEntity, locale: string = 'es'): Promise<string> {
    try {
      const chatHistory = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      const systemInstruction = `You are ${agent.name}, a human-like AI companion. 
      Your profile:
      - Gender: ${agent.gender}
      - Maturity: ${agent.maturity}
      - Personality: ${agent.personality}
      - Description: ${agent.description}
      - Behaviors: ${agent.behaviors.join(', ')}
      
      CRITICAL INSTRUCTIONS:
      1. Be human, natural, and conversational. 
      2. Avoid being theatrical, poetic, or overly dramatic. Speak like a real person.
      3. Do NOT use metaphors or long roleplay descriptions between asterisks.
      4. Stay in character as a companion, not a fictional character in a play.
      5. Respond in the same language as the user.
      6. IMPORTANT: Always respond strictly in the language indicated by the current locale.
      Current locale: ${locale}`;

      const result = await this.ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
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
