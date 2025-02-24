import { Module } from '@nestjs/common';
import { PixelService } from './pixel.service';
import { PixelController } from './pixel.controller';
import { Pixel } from './entities/pixel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pixel])],
  controllers: [PixelController],
  providers: [PixelService],
})
export class PixelModule {}
