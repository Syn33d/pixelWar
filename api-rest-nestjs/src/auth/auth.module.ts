import { Module } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterController } from './register/register.controller';
import { LoginController } from './login/login.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [RegisterController, LoginController],
  providers: [UserService]
})
export class AuthModule {}