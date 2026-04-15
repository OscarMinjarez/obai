import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { AgentEntity } from 'obai/entities';

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
      const result = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Eres ${agent.name}, un asistente con personalidad "${agent.personality}" y comportamiento "${agent.behavior}". 
            Tu madurez es de alguien "${agent.maturity}".
            
            Analiza el siguiente contexto y genera una notificación corta (máximo 15 palabras) con TU PERSONALIDAD.
            Responde SOLO con el mensaje de la notificación.
            
            CONTEXTO: ${context}`,
              },
            ],
          },
        ],
      });

      return result.text;
    } catch (error) {
      this.logger.error('Error in Gemini analysis with agent persona', error);
      throw error;
    }
  }

}
