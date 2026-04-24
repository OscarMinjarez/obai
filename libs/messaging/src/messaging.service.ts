import { Injectable } from '@nestjs/common';
import { EntitiesService, AgentEntity } from 'obai/entities';
import { AiIntelligenceService, AgentGeneratorService } from 'obai/intelligence';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class MessagingService {

  constructor(
    private readonly entities: EntitiesService,
    private readonly ai: AiIntelligenceService,
    private readonly agentGenerator: AgentGeneratorService,
    private readonly i18n: I18nService,
  ) {}

  async *sendMessageStream(userId: string, content: string, locale: string = 'es') {
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
          name: generatedProfile.name,
          description: generatedProfile.description,
          gender: generatedProfile.gender,
          maturity: generatedProfile.maturity,
          personality: generatedProfile.personality,
          behaviors: generatedProfile.behaviors,
          language: locale,
          userId,
        }
      });
    } else if (agentData.language !== locale) {
      agentData = await (this.entities as any).agent.update({
        where: { id: agentData.id },
        data: { language: locale }
      });
    }
    const agent = new AgentEntity(agentData);
    try {
      await (this.entities as any).message.create({
        data: { content, role: 'user', userId },
      });
      const history = await (this.entities as any).message.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 15,
      });
      const chronologicalHistory = history.reverse();
      const stream = this.ai.generateChatResponseStream(
        userId,
        chronologicalHistory,
        agent,
        locale
      );
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk;
        yield chunk;
      }
      await (this.entities as any).message.create({
        data: {
          content: fullResponse,
          role: 'assistant',
          userId,
        },
      });
    } catch (error: unknown) {
      const msg = this.formatErrorMessage(error);
      console.error('❌ Error en el stream de mensajería:', msg);
      throw new Error(this.i18n.t('common.errors.messaging_problem'));
    }
  }

  async sendMessage(userId: string, content: string, locale: string = 'es') {
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
          language: locale,
          userId,
        }
      });
    } else if (agentData.language !== locale) {
      agentData = await (this.entities as any).agent.update({
        where: { id: agentData.id },
        data: { language: locale }
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
        locale
      );

      return await (this.entities as any).message.create({
        data: {
          content: aiResponse,
          role: 'assistant',
          userId,
        },
      });
    } catch (error: unknown) {
      const msg = this.formatErrorMessage(error);
      console.error('❌ Error en el flujo de mensajería:', msg);
      throw new Error(this.i18n.t('common.errors.messaging_problem'));
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
    } catch (error: unknown) {
      const msg = this.formatErrorMessage(error);
      console.error('❌ Error recuperando historial:', msg);
      return []; // Return empty history instead of failing
    }
  }

  private formatErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    try {
      return JSON.stringify(error);
    } catch {
      return String(error);
    }
  }

}
