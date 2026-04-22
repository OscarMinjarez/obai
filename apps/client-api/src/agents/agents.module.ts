import { Module } from '@nestjs/common';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { EntitiesModule } from 'obai/entities';
import { IntelligenceModule } from 'obai/intelligence';

@Module({
  imports: [EntitiesModule, IntelligenceModule],
  controllers: [AgentsController],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}
