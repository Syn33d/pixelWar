import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { WebsocketService } from './websocket.service';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
import { Server, Socket } from 'socket.io';
import { PixelService } from 'src/pixel/pixel.service';
import { UpdatePixelDto } from 'src/pixel/dto/update-pixel.dto';

@WebSocketGateway()
export class WebsocketGateway {
  constructor(private readonly websocketService: WebsocketService, private readonly pixelService:PixelService) {
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

  @SubscribeMessage('updatePixel')
  async updatePixel(@MessageBody() updatePixelDto: UpdatePixelDto) {
    console.log('updatePixel event received:', updatePixelDto);
    const updatePixel = await this.pixelService.update(updatePixelDto.id, updatePixelDto);
    this.server.emit('updatePixel', updatePixel);
    return updatePixel;
  }
}