import { Injectable } from '@nestjs/common';
import { CreatePlayerLogDto } from './dto/create-player-log.dto';
import { UpdatePlayerLogDto } from './dto/update-player-log.dto';
import { PlayerLog } from './entities/player-log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayerLogService {
  constructor(@InjectRepository(PlayerLog) private readonly data: Repository<PlayerLog>){}

  async create(createPlayerLogDto: CreatePlayerLogDto) {
    return await this.data.save(createPlayerLogDto);
  }

  async findAll() {
    return await this.data.find();
  }

  async findOne(id: number) {
    return await this.data.findOneBy({id});
  }

  async update(id: number, updatePlayerLogDto: UpdatePlayerLogDto) {
    return await this.data.update(id, updatePlayerLogDto);
  }

  async remove(id: number) {
    return await this.data.delete(id);
  }
}
