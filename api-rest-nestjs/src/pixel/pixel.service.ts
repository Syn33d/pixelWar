import { Injectable } from '@nestjs/common';
import { CreatePixelDto } from './dto/create-pixel.dto';
import { UpdatePixelDto } from './dto/update-pixel.dto';

@Injectable()
export class PixelService {
  create(createPixelDto: CreatePixelDto) {
    return 'This action adds a new pixel';
  }

  findAll() {
    return `This action returns all pixel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pixel`;
  }

  update(id: number, updatePixelDto: UpdatePixelDto) {
    return `This action updates a #${id} pixel`;
  }

  remove(id: number) {
    return `This action removes a #${id} pixel`;
  }
}
