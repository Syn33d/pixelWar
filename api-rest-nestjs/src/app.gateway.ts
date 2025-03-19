import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('updatePixel')
  handleUpdatePixel(@MessageBody() data: { x: number, y: number, color: string }): void {
    this.server.emit('pixelUpdated', data);
  }
}