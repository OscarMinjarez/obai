import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagingService } from './messaging.service';
import { Logger, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection {

  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(private readonly messagingService: MessagingService) {}

  async handleConnection(client: Socket) {
    this.logger.log(`Intento de conexión detectado...`);
    try {
      const token = 
        client.handshake.auth?.token || 
        client.handshake.query?.token || 
        client.handshake.headers?.authorization?.split(' ')[1];
      this.logger.log(`Token recibido: ${token ? 'SÍ' : 'NO'}`);

      if (!token) {
        this.logger.warn('Conexión rechazada: No se proporcionó token.');
        throw new UnauthorizedException('No token provided');
      }

      const decoded = jwt.decode(token, { complete: true }) as any;
      if (!decoded) {
        this.logger.warn('Conexión rechazada: Token inválido o mal formado.');
        throw new UnauthorizedException('Invalid token');
      }
      client.data.userId = decoded.payload.sub;
      const userAgent = client.handshake.headers['user-agent'] || '';
      const isMobile = /mobile/i.test(userAgent);
      const deviceType = isMobile ? 'Móvil' : 'Web';
      client.data.device = deviceType;
      client.join(client.data.userId);
      this.logger.log(`✅ Usuario ${client.data.userId} conectado desde: ${deviceType} (${userAgent.substring(0, 50)}...)`);
      const history = await this.messagingService.getHistory(client.data.userId);
      client.emit('chat:history', history);
      client.emit('chat:device_info', { deviceType });
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : (typeof error === 'string' ? error : String(error));
      const errStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`❌ Conexión fallida: ${errMessage}`, errStack);
      client.disconnect();
    }
  }

  @SubscribeMessage('chat:send')
  async handleMessage(
    @MessageBody() data: { id?: string, message: string, locale: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    if (!userId) return;

    try {
      const userMessageId = data.id || `user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      client.to(userId).emit('chat:receive', { 
        id: userMessageId,
        role: 'user', 
        content: data.message, 
        locale: data.locale,
        createdAt: new Date().toISOString() 
      });

      const stream = this.messagingService.sendMessageStream(userId, data.message, data.locale);
      
      let fullContent = '';
      const messageId = `ai_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

      for await (const chunk of stream) {
        fullContent += chunk;
        this.server.to(userId).emit('chat:receive_chunk', {
          id: messageId,
          chunk: chunk,
          role: 'assistant'
        });
      }

      this.server.to(userId).emit('chat:receive', {
        id: messageId,
        content: fullContent,
        role: 'assistant',
        locale: data.locale,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : (typeof error === 'string' ? error : String(error));
      const errStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Error en el chat gateway: ${errMessage}`, errStack);
      client.emit('chat:error', { message: 'No pude procesar tu mensaje.' });
    }
  }

}
