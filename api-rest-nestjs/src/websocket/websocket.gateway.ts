import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { WebsocketService } from './websocket.service';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
import { Server, Socket } from 'socket.io';
import { CanvasService } from 'src/canvas/canvas.service';
import { UpdateCanvaDto } from 'src/canvas/dto/update-canva.dto';

@WebSocketGateway()
export class WebsocketGateway {
  constructor(private readonly websocketService: WebsocketService, private readonly canvaService:CanvasService) {
    console.log('WebSocketGateway initialized 🚀');
  }

  @WebSocketServer() 
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket is running ! ✅');
  }

  handleConnection(client: Socket){
    console.log('New client connected ! 🚀');
  }

  @SubscribeMessage('createWebsocket')
  create(@MessageBody() createWebsocketDto: CreateWebsocketDto) {
    return this.websocketService.create(createWebsocketDto);
  }

  @SubscribeMessage('findAllWebsocket')
  findAll() {
    return this.websocketService.findAll();
  }

  @SubscribeMessage('findOneWebsocket')
  findOne(@MessageBody() id: number) {
    return this.websocketService.findOne(id);
  }

  @SubscribeMessage('updateWebsocket')
  update(@MessageBody() updateWebsocketDto: UpdateWebsocketDto) {
    return this.websocketService.update(updateWebsocketDto.id, updateWebsocketDto);
  }

  @SubscribeMessage('removeWebsocket')
  remove(@MessageBody() id: number) {
    return this.websocketService.remove(id);
  }

  @SubscribeMessage('updateCanva')
  async updateCanva(@MessageBody() updateCanvaDto: UpdateCanvaDto) {
    console.log('updateCanva event received:', updateCanvaDto);
    const updateCanva = await this.canvaService.update(updateCanvaDto.id, updateCanvaDto);
    this.server.emit('updateCanva', updateCanva);
    return updateCanva;
  }
}