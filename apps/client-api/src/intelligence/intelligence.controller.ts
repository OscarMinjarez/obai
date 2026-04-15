import { Controller, Post, Param, Body } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { AnalyzeContextRequest } from './requests/analyze-context.request';

@Controller('intelligence')
export class IntelligenceController {

  constructor(private readonly intelligenceService: IntelligenceService) {}

  @Post('trace/:id')
  async trace(@Param('id') id: string, @Body() body: AnalyzeContextRequest) {
    await this.intelligenceService.analyzeContextAndNotify(id, body.context);
    return {
      success: true,
      message: 'Intelligence analysis triggered successfully',
    };
  }

}
