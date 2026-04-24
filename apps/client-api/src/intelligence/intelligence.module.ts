import { Module } from '@nestjs/common';
import { IntelligenceController } from './intelligence.controller.js';
import { IntelligenceService } from './intelligence.service.js';
import { EntitiesModule } from 'obai/entities';
import { IntelligenceModule as AiLibraryModule } from 'obai/intelligence';

@Module({
  imports: [EntitiesModule, AiLibraryModule],
  controllers: [IntelligenceController],
  providers: [IntelligenceService],
})
export class IntelligenceModule {}
