import { Injectable } from '@nestjs/common';
import { CreatePlayerLogDto } from './dto/create-player-log.dto';
import { UpdatePlayerLogDto } from './dto/update-player-log.dto';

@Injectable()
export class PlayerLogService {
  create(createPlayerLogDto: CreatePlayerLogDto) {
    return 'This action adds a new playerLog';
  }

  findAll() {
    return `This action returns all playerLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playerLog`;
  }

  update(id: number, updatePlayerLogDto: UpdatePlayerLogDto) {
    return `This action updates a #${id} playerLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} playerLog`;
  }
}
