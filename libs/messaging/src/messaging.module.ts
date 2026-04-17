import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { EntitiesModule } from 'obai/entities';
import { IntelligenceModule } from 'obai/intelligence';

@Module({
  imports: [EntitiesModule, IntelligenceModule],
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}
