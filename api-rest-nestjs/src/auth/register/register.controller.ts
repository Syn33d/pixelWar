import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Controller('register')
export class RegisterController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOneByEmail(createUserDto.email).catch(() => null);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    return this.userService.create(createUserDto);
  }
}
