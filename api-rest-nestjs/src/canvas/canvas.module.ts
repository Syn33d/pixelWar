import { Module } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CanvasController } from './canvas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Canvas } from './entities/canvas.entity';
import { CanvasLog } from 'src/canvas-log/entities/canvas-log.entity';
import { CanvasLogModule } from 'src/canvas-log/canvas-log.module';
import { PlayerLogModule } from 'src/player-log/player-log.module';
import { CanvasLogService } from 'src/canvas-log/canvas-log.service';
import { PlayerLogService } from 'src/player-log/player-log.service';
import { PlayerLog } from 'src/player-log/entities/player-log.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Canvas, CanvasLog, PlayerLog]),
    CanvasLogModule,
    PlayerLogModule,
    AuthModule,
  ],
  controllers: [CanvasController],
  providers: [CanvasService, CanvasLogService, PlayerLogService, JwtService],
  exports: [CanvasService],
})
export class CanvasModule {}
