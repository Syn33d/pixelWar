import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import { CanvasModule } from 'src/canvas/canvas.module';

@Module({
  imports: [CanvasModule],
  providers: [WebsocketGateway, WebsocketService],
  exports: [WebsocketGateway],
})
export class WebsocketModule {}
