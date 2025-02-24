import { Module } from '@nestjs/common';
import { LogWarService } from './log-war.service';
import { LogWarController } from './log-war.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogWar } from './entities/log-war.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogWar])],
  controllers: [LogWarController],
  providers: [LogWarService],
})
export class LogWarModule {}
