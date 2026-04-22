import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { EntitiesModule } from 'obai/entities';
import { IntelligenceModule } from 'obai/intelligence';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [EntitiesModule, IntelligenceModule],
  providers: [MessagingService, ChatGateway],
  exports: [MessagingService],
})
export class MessagingModule {}
