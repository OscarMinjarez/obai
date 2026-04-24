import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MessagingService } from 'obai/messaging';
import { SendMessageDto } from './dto/send-message.dto.js';
import { JwtAuthGuard } from 'obai/auth';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {

  constructor(private readonly messagingService: MessagingService) {}

  @Post('send')
  async sendMessage(@Req() req: any, @Body() dto: SendMessageDto) {
    return this.messagingService.sendMessage(req.user.id, dto.message);
  }

  @Get('history')
  async getHistory(@Req() req: any) {
    return this.messagingService.getHistory(req.user.id);
  }

}
