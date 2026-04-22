import { Injectable, Logger } from '@nestjs/common';
import { AgentRepository, AgentEntity } from 'obai/entities';
import { AgentGeneratorService } from 'obai/intelligence';

@Injectable()
export class AgentsService {

  private readonly logger = new Logger(AgentsService.name);

  constructor(
    private readonly agentRepo: AgentRepository,
    private readonly agentGenerator: AgentGeneratorService,
  ) {}

  async getMyAgent(userId: string): Promise<AgentEntity | null> {
    return this.agentRepo.findByUserId(userId);
  }

  async suggestAgent(userId: string, lang: string = 'ES') {
    return this.agentGenerator.generateRandomAgent(userId, lang);
  }

  async createAgent(userId: string, data: Partial<AgentEntity>): Promise<AgentEntity> {
    const existing = await this.agentRepo.findByUserId(userId);
    
    if (existing) {
      return this.agentRepo.update(existing.id, data);
    }
    
    return this.agentRepo.create({
      ...data,
      userId,
    } as any);
  }

}
