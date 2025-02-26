import { Injectable } from '@nestjs/common';
import { CreateLogWarDto } from './dto/create-log-war.dto';
import { UpdateLogWarDto } from './dto/update-log-war.dto';

@Injectable()
export class LogWarService {
  create(createLogWarDto: CreateLogWarDto) {
    return 'This action adds a new logWar';
  }

  findAll() {
    return `This action returns all logWar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logWar`;
  }

  update(id: number, updateLogWarDto: UpdateLogWarDto) {
    return `This action updates a #${id} logWar`;
  }

  remove(id: number) {
    return `This action removes a #${id} logWar`;
  }
}
