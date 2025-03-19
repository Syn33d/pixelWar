import { Injectable } from '@nestjs/common';
import { CreateCanvasLogDto } from './dto/create-canvas-log.dto';
import { UpdateCanvasLogDto } from './dto/update-canvas-log.dto';
import { Repository } from 'typeorm';
import { CanvasLog } from './entities/canvas-log.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CanvasLogService {
  constructor(
    @InjectRepository(CanvasLog) private readonly data: Repository<CanvasLog>,
  ) {}

  async create(createCanvasLogDto: CreateCanvasLogDto) {
    return await this.data.save(createCanvasLogDto);
  }

  async findAll() {
    return await this.data.find();
  }

  async findOne(id: number) {
    return await this.data.findOneBy({ id });
  }

  async update(id: number, updateCanvasLogDto: UpdateCanvasLogDto) {
    return await this.data.update(id, updateCanvasLogDto);
  }

  async remove(id: number) {
    return await this.data.delete(id);
  }
}
