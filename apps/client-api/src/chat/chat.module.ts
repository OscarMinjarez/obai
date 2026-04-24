import { Module } from '@nestjs/common';
import { MessagingModule } from 'obai/messaging';
import { ChatController } from './chat.controller.js';

@Module({
  imports: [MessagingModule],
  controllers: [ChatController],
})
export class ChatModule {}
