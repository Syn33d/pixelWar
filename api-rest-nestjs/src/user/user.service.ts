import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs'

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

  async findOneByEmail(email: string): Promise<User> {
    const found = await this.data.findOneBy({ email });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async findOneByUserName(username: string): Promise<User> {
    const found = await this.data.findOneBy({ username });
    if (!found) {
      throw new NotFoundException();
    }
    return found; 
  }

  async findOneByPasswordResetToken(token: string): Promise<User | undefined> {
    const user = await this.data.findOne({ where: { passwordResetToken: token } });
    if (user && user.passwordResetExpires && user.passwordResetExpires.getTime() > Date.now()) {
      return user;
    }
    return undefined;
  }

  async updatePassword(username: string, newPassword: string): Promise<void> {
    const user = await this.data.findOneBy({ username });
    if (!user) {
      throw new Error('User not found');
    }
    user.password = newPassword;
    user.passwordResetToken = '';
    await this.data.save(user);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.data.findOneBy({ username });
    if (user) {
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (passwordMatches) {
        return user;
      }
    }
    return null;
  }

  async checkPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async saveResetToken(username: string, token: string) {
    const user = await this.data.findOneBy({ username });;
    if (!user) {
      throw new Error('User not found');
    }

    user.passwordResetToken = token;
    await this.data.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.data.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.data.delete(id);
  }
}
