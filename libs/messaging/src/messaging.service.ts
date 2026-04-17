import { Injectable, NotFoundException } from '@nestjs/common';
import { EntitiesService, AgentEntity } from 'obai/entities';
import { AiIntelligenceService, AgentGeneratorService } from 'obai/intelligence';

@Injectable()
export class MessagingService {
  constructor(
    private readonly entities: EntitiesService,
    private readonly ai: AiIntelligenceService,
    private readonly agentGenerator: AgentGeneratorService,
  ) {}

  async sendMessage(userId: string, content: string) {
    // 0. Sincronización de Fallback: Si el usuario de Supabase no existe en Prisma local, lo creamos.
    let userExists = await (this.entities as any).user.findUnique({ where: { id: userId } });
    if (!userExists) {
      this.ai['logger']?.warn(`Usuario ${userId} no encontrado en Prisma. Creando fallback local...`);
      await (this.entities as any).user.create({
        data: {
          id: userId,
          email: `${userId}@supabase.fallback`,
          password: '[SUPABASE_AUTH_DELEGATED]',
        }
      });
    }

    // 1. Buscamos al agente del usuario
    let agentData = await (this.entities as any).agent.findUnique({
      where: { userId },
    });

    if (!agentData) {
      // Usamos el AgentGeneratorService para crear un agente con personalidad según el idioma
      const generatedProfile = await this.agentGenerator.generateRandomAgent(userId, 'ES');
      agentData = await (this.entities as any).agent.create({
        data: {
          name: generatedProfile.name || 'Obai Base',
          description: generatedProfile.description || 'Soy Obai, tu asistente inteligente.',
          gender: generatedProfile.gender || 'MALE',
          maturity: generatedProfile.maturity || 'MATURE',
          personality: generatedProfile.personality || 'Amigable',
          behaviors: generatedProfile.behaviors || ['Profesional'],
          userId,
        }
      });
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
