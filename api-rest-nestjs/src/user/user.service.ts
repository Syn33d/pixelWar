import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly data: Repository<User>){}

  async create(createUserDto: CreateUserDto) {
    return await this.data.save(createUserDto);
  }

  async findAll() {
    return await this.data.find();
  }

  async findOne(id: number) {
    return await this.data.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.data.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.data.delete(id);
  }
}
