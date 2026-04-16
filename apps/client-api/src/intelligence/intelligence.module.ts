import { Module } from '@nestjs/common';
import { IntelligenceController } from './intelligence.controller';
import { IntelligenceService } from './intelligence.service';
import { EntitiesModule } from 'obai/entities';
import { IntelligenceModule as AiLibraryModule } from 'obai/intelligence';

@Module({
  imports: [EntitiesModule, AiLibraryModule],
  controllers: [IntelligenceController],
  providers: [IntelligenceService],
})
export class IntelligenceModule {}
