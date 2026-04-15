import { Module } from '@nestjs/common';
import { AiIntelligenceService } from './intelligence.service';

@Module({
  providers: [AiIntelligenceService],
  exports: [AiIntelligenceService],
})
export class IntelligenceModule {}
