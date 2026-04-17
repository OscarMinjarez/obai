import { Body, Controller, Get, Param, Post, Headers, Req } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { AnalyzeContextRequest } from './requests/analyze-context.request';
import { AgentGeneratorService } from 'obai/intelligence';
import { AgentRepository, AgentEntity } from 'obai/entities';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'obai/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('intelligence')
@UseGuards(JwtAuthGuard)
export class IntelligenceController {

  constructor(
    private readonly intelligenceService: IntelligenceService,
    private readonly agentGenerator: AgentGeneratorService,
    private readonly agentRepo: AgentRepository,
  ) {}

  @Post('trace')
  async trace(@Req() req, @Body() data: AnalyzeContextRequest) {
    const userId = req.user.id;
    await this.intelligenceService.analyzeContextAndNotify(userId, data.context);
    return { success: true, message: 'Intelligence analysis triggered successfully' };
  }

  @Get('agent/generate')
  async generate(@Req() req, @Headers('accept-language') langHeader: string) {
    const userId = req.user.id;
    const detectedLang = langHeader ? langHeader.split(',')[0].split('-')[0].toUpperCase() : 'ES';
    return this.agentGenerator.generateRandomAgent(userId, detectedLang);
  }

  @Post('agent/confirm')
  async confirm(@Req() req, @Body() agentData: any) {
    const userId = req.user.id;
    const existing = await this.agentRepo.findByUserId(userId);
    if (existing) {
      await this.agentRepo.deleteByUserId(userId);
    }
    return this.agentRepo.create(agentData as AgentEntity);
  }

}
