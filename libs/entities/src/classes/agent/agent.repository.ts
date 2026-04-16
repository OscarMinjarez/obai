import { Injectable } from '@nestjs/common';
import { AgentEntity } from './agent.entity';
import { BaseRepository } from '../base.repository';
import { EntitiesService } from '../../entities.service';

@Injectable()
export class AgentRepository extends BaseRepository<AgentEntity> {

  constructor(private readonly entitiesService: EntitiesService) {
    super(entitiesService, 'agent');
  }

  async findByUserId(userId: string): Promise<AgentEntity | null> {
    const agent = await this.entitiesService.agent.findUnique({
      where: { userId },
    });
    return agent ? new AgentEntity(agent as any) : null;
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.entitiesService.agent.delete({
      where: { userId },
    });
  }

}
