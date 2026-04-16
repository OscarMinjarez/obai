import { Module } from '@nestjs/common';
import { AiIntelligenceService } from './intelligence.service';
import { AgentGeneratorService } from './agent-generator.service';

@Module({
  providers: [AiIntelligenceService, AgentGeneratorService],
  exports: [AiIntelligenceService, AgentGeneratorService],
})
export class IntelligenceModule {}
