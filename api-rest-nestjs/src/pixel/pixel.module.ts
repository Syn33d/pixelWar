import { Module } from '@nestjs/common';
import { PixelService } from './pixel.service';
import { PixelController } from './pixel.controller';
import { Pixel } from './entities/pixel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //Importation du module TypeOrmModule pour les entités Pixel
  imports: [TypeOrmModule.forFeature([Pixel])],

  //Liste des controllers et des fournisseurs de services
  controllers: [PixelController],
  providers: [PixelService],
})
export class PixelModule {}
