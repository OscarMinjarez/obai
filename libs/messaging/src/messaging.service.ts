import { Injectable } from '@nestjs/common';
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
    const userExists = await (this.entities as any).user.findUnique({ where: { id: userId } });
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
    let agentData = await (this.entities as any).agent.findUnique({
      where: { userId },
    });
    if (!agentData) {
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
    
    try {
      await (this.entities as any).message.create({
        data: {
          content,
          role: 'user',
          userId,
        },
      });

      const history = await (this.entities as any).message.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 15,
      });
      const chronologicalHistory = history.reverse();
      const aiResponse = await this.ai.generateChatResponse(
        userId,
        chronologicalHistory,
        agent,
      );

      return await (this.entities as any).message.create({
        data: {
          content: aiResponse,
          role: 'assistant',
          userId,
        },
      });
    } catch (error) {
      console.error('❌ Error en el flujo de mensajería:', error.message);
      throw new Error('Lo siento, hubo un problema al procesar tu mensaje. Inténtalo de nuevo.');
    }
  }

  async getHistory(userId: string) {
    try {
      const history = await (this.entities as any).message.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
        take: 50,
      });

      if (history.length === 0) {
        // If no history, let's create a personalized welcome message
        const agentData = await (this.entities as any).agent.findUnique({
          where: { userId },
        });

        if (agentData) {
          const agent = new AgentEntity(agentData);
          const welcomeMessage = await this.ai.generateChatResponse(
            userId,
            [{ role: 'system', content: 'Greet the user for the first time. Keep it extremely simple, human, and friendly. Avoid any drama, poetry, or roleplay.' }],
            agent
          );

          const savedWelcome = await (this.entities as any).message.create({
            data: {
              content: welcomeMessage,
              role: 'assistant',
              userId,
            },
          });
          return [savedWelcome];
        }
      }

      return history;
    } catch (error) {
      console.error('❌ Error recuperando historial:', error.message);
      return []; // Return empty history instead of failing
    }
  }

}
