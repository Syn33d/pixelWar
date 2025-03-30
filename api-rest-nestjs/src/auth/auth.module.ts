import { Module } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterController } from './register/register.controller';
import { LoginController } from './login/login.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LoginStrategy } from './jwt/login.strategy';
import { TokenController } from './token/token.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "banane",
      signOptions: {
        audience: process.env.JWT_AUDIENCE || "pixelWar.com"
      }
    })
  ],
  controllers: [TokenController, RegisterController, LoginController],
  providers: [UserService, JwtService],
  exports: [JwtModule]
})
export class AuthModule {}