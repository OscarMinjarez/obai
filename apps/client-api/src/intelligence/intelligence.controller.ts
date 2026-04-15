import { Body, Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { AnalyzeContextRequest } from './requests/analyze-context.request';
import { AgentGeneratorService } from 'obai/intelligence';
import { AgentRepository, AgentEntity } from 'obai/entities';

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
  async generate(@Param('id') userId: string, @Headers('accept-language') langHeader: string) {
    const detectedLang = langHeader ? langHeader.split(',')[0].split('-')[0].toUpperCase() : 'ES';
    return this.agentGenerator.generateRandomAgent(userId, detectedLang);
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
