import { Module } from '@nestjs/common';
import { PlayerLogService } from './player-log.service';
import { PlayerLogController } from './player-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerLog } from './entities/player-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerLog])],
  controllers: [PlayerLogController],
  providers: [PlayerLogService],
})
export class PlayerLogModule {}
