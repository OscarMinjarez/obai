import { Body, Controller, Get, Post, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'obai/auth/guards/jwt-auth/jwt-auth.guard';
import { AgentsService } from './agents.service';

@Controller('agents')
@UseGuards(JwtAuthGuard)
export class AgentsController {

  constructor(private readonly agentsService: AgentsService) {}

  @Get('me')
  async getMe(@Req() req) {
    return this.agentsService.getMyAgent(req.user.id);
  }

  @Get('suggest')
  async suggest(@Req() req, @Query('lang') lang?: string) {
    return this.agentsService.suggestAgent(req.user.id, lang);
  }

  @Post()
  async createOrUpdate(@Req() req, @Body() data: any) {
    return this.agentsService.createAgent(req.user.id, data);
  }

}
