import { Module } from '@nestjs/common';
import { PlayerLogService } from './player-log.service';
import { PlayerLogController } from './player-log.controller';

@Module({
  controllers: [PlayerLogController],
  providers: [PlayerLogService],
})
export class PlayerLogModule {}
