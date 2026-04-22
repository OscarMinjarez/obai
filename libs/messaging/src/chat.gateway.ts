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
  server: Server;

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
      client.join(client.data.userId);
      this.logger.log(`✅ Usuario autenticado y unido a sala: ${client.data.userId}`);

      const history = await this.messagingService.getHistory(client.data.userId);
      client.emit('chat:history', history);
    } catch (error) {
      this.logger.error(`❌ Conexión fallida: ${error.message}`);
      client.disconnect();
    }
  }

  @SubscribeMessage('chat:send')
  async handleMessage(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    if (!userId) return;

    // Notificar escritura a todos los dispositivos del usuario
    this.server.to(userId).emit('chat:typing', { isTyping: true });

    try {
      // Reenviar el mensaje del usuario a sus otros dispositivos para sincronizar la vista
      client.to(userId).emit('chat:receive', { 
        role: 'user', 
        content: data.message, 
        createdAt: new Date().toISOString() 
      });

      const response = await this.messagingService.sendMessage(userId, data.message);
      
      // Enviar la respuesta del bot a TODOS los dispositivos del usuario
      this.server.to(userId).emit('chat:receive', response);
    } catch (error) {
      this.logger.error('Error en el chat gateway', error);
      client.emit('chat:error', { message: 'No pude procesar tu mensaje.' });
    } finally {
      this.server.to(userId).emit('chat:typing', { isTyping: false });
    }
  }

}
