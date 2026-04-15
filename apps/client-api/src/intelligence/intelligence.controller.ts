import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { AnalyzeContextRequest } from './requests/analyze-context.request';
import { AgentGeneratorService } from 'obai/intelligence';
import { AgentEntity } from 'obai/entities';
import { AgentRepository } from 'obai/entities/classes/agent/agent.repository';

@Controller('intelligence')
export class IntelligenceController {

  constructor(
    private readonly intelligenceService: IntelligenceService,
    private readonly agentGenerator: AgentGeneratorService,
    private readonly agentRepo: AgentRepository,
  ) {}

  @Post('trace/:id')
  async trace(@Param('id') userId: string, @Body() data: AnalyzeContextRequest) {
    await this.intelligenceService.analyzeContextAndNotify(userId, data.context);
    return { success: true, message: 'Intelligence analysis triggered successfully' };
  }

  @Get('agent/generate/:id')
  async generate(@Param('id') userId: string) {
    return this.agentGenerator.generateRandomAgent(userId);
  }

  @Post('agent/confirm/:id')
  async confirm(@Param('id') userId: string, @Body() agentData: any) {
    const existing = await this.agentRepo.findByUserId(userId);
    if (existing) {
      await this.agentRepo.deleteByUserId(userId);
    }
    return this.agentRepo.create(agentData as AgentEntity);
  }

}
