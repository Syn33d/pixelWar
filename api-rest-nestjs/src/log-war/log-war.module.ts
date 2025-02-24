import { Module } from '@nestjs/common';
import { LogWarService } from './log-war.service';
import { LogWarController } from './log-war.controller';

@Module({
  controllers: [LogWarController],
  providers: [LogWarService],
})
export class LogWarModule {}
