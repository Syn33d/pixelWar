import { Injectable } from '@nestjs/common';
import { CreateCanvasLogDto } from './dto/create-canvas-log.dto';
import { UpdateCanvasLogDto } from './dto/update-canvas-log.dto';

@Injectable()
export class CanvasLogService {
  create(createCanvasLogDto: CreateCanvasLogDto) {
    return 'This action adds a new canvasLog';
  }

  findAll() {
    return `This action returns all canvasLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} canvasLog`;
  }

  update(id: number, updateCanvasLogDto: UpdateCanvasLogDto) {
    return `This action updates a #${id} canvasLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} canvasLog`;
  }
}
