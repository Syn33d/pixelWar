import { Module } from '@nestjs/common';
import { LogWarService } from './log-war.service';
import { LogWarController } from './log-war.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogWar } from './entities/log-war.entity';

@Module({
  //Importation du module TypeOrmModule pour les entités LogWar
  imports: [TypeOrmModule.forFeature([LogWar])],

  //Liste des controllers et des fournisseurs de services
  controllers: [LogWarController],
  providers: [LogWarService],
})
export class LogWarModule {}
