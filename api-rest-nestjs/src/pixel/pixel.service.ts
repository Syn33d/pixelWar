import { Injectable } from '@nestjs/common';
import { CreatePixelDto } from './dto/create-pixel.dto';
import { UpdatePixelDto } from './dto/update-pixel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pixel } from './entities/pixel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PixelService {
  constructor(@InjectRepository(Pixel) private data: Repository<Pixel>) {}

  create(createPixelDto: CreatePixelDto) {
    return 'This action adds a new pixel';
  }

  findAll() {
    return `This action returns all pixel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pixel`;
  }

  //Méthode asynchrone pour mettre à jour un pixel en fonction de son id et des données de mise à jour
  async update(id: number, updatePixelDto: UpdatePixelDto) {
      return await this.data.update(id, updatePixelDto);
  }

  remove(id: number) {
    return `This action removes a #${id} pixel`;
  }
}
