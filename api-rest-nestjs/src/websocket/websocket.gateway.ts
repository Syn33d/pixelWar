import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { WebsocketService } from './websocket.service';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
import { Server, Socket } from 'socket.io';
import { CanvasService } from 'src/canvas/canvas.service';
import { UpdateCanvaDto } from 'src/canvas/dto/update-canva.dto';

@WebSocketGateway()
export class WebsocketGateway {
  constructor(private readonly websocketService: WebsocketService, private readonly canvasService:CanvasService) {
    console.log('WebSocketGateway initialized 🚀');
  }

  @WebSocketServer() 
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket is running !');
  }

  handleConnection(client: Socket){
    console.log('New client connected !');
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
  async updateCanva(@MessageBody() payload: any) {
  console.log('updateCanva event received:', payload);

  const parsedPayload = JSON.parse(payload); 
  console.log('Parsed payload:', parsedPayload);

  if (!parsedPayload.data) {
    console.error('Error: Missing "data" in payload');
    return;
  }

  //Vérifie que 'userId', 'id', 'x', 'y' et 'color' existent
  const { id, userId, pixel } = parsedPayload.data;

  //Log les données extraites
  console.log('Extracted data:', parsedPayload.data);
  console.log('id:', id);
  console.log('userId:', userId);

  //Vérifie que les données du pixel sont présentes
  if (!Array.isArray(pixel) || pixel.length === 0) {
    console.error('Missing required data (id, userId, pixel array)');
    return;
  }
  
  //Vérifie que les données du pixel sont valides
  for (const p of pixel) {
    console.log(`Modification demandée : Pixel (${p.x}, ${p.y}) => Couleur ${p.color}`);
    if (p.x === undefined || p.y === undefined || !p.color) {
      console.error('Invalid pixel data (x, y, color) missing');
      return;
    }
  }

  const updateCanvaDto = { id, userId, pixel: pixel[0], updatedAt: new Date() };

  //Effectue la mise à jour
  try {
    const updateCanva = await this.canvasService.update(id, updateCanvaDto);
    this.server.emit('updateCanva', {
      canvaId: id,
      pixel: updateCanvaDto.pixel, 
    });

    return updateCanva
  } catch (error) {
    console.error('Error during update:', error);
  }
}
}