import { Module } from '@nestjs/common';
import { AgentsController } from './agents.controller.js';
import { AgentsService } from './agents.service.js';
import { EntitiesModule } from 'obai/entities';
import { IntelligenceModule } from 'obai/intelligence';

@Module({
  imports: [EntitiesModule, IntelligenceModule],
  controllers: [AgentsController],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}
