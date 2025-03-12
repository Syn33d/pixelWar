import { Module } from '@nestjs/common';
import { CanvasLogService } from './canvas-log.service';
import { CanvasLogController } from './canvas-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanvasLog } from './entities/canvas-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CanvasLog])],
  controllers: [CanvasLogController],
  providers: [CanvasLogService],
})
export class CanvasLogModule {}
