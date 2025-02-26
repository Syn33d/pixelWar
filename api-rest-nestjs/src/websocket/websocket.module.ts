import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import { PixelModule } from 'src/pixel/pixel.module';

@Module({
  imports: [PixelModule],
  providers: [WebsocketGateway, WebsocketService],
})
export class WebsocketModule {}
