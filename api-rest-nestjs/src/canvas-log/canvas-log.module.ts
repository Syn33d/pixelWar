import { Module } from '@nestjs/common';
import { CanvasLogService } from './canvas-log.service';
import { CanvasLogController } from './canvas-log.controller';

@Module({
  controllers: [CanvasLogController],
  providers: [CanvasLogService],
})
export class CanvasLogModule {}
