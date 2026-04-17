import { Injectable, NotFoundException } from '@nestjs/common';
import { EntitiesService, AgentEntity } from 'obai/entities';
import { AiIntelligenceService } from 'obai/intelligence';

@Injectable()
export class MessagingService {

  constructor(
    private readonly entities: EntitiesService,
    private readonly ai: AiIntelligenceService,
  ) {}

  async sendMessage(userId: string, content: string) {
    // 1. Buscamos al agente del usuario
    const agentData = await (this.entities as any).agent.findUnique({
      where: { userId },
    });

    if (!agentData) {
      throw new NotFoundException('No active agent found for this user.');
    }

    const agent = new AgentEntity(agentData);

    // 2. Guardamos el mensaje del usuario
    await (this.entities as any).message.create({
      data: {
        content,
        role: 'user',
        userId,
        agentId: agent.id,
      },
    });

    // 3. Obtenemos el historial (últimos 15 mensajes para contexto)
    const history = await (this.entities as any).message.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 15,
    });

    // Invertimos para que estén en orden cronológico para la IA
    const chronologicalHistory = history.reverse();

    // 4. Generamos la respuesta con Gemini
    const aiResponse = await this.ai.generateChatResponse(
      userId,
      chronologicalHistory,
      agent,
    );

    // 5. Guardamos la respuesta del asistente
    return await (this.entities as any).message.create({
      data: {
        content: aiResponse,
        role: 'assistant',
        userId,
        agentId: agent.id,
      },
    });
  }

  async getHistory(userId: string) {
    return (this.entities as any).message.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      take: 50,
    });
  }

}
