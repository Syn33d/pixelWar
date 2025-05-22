import { Controller, Post, Body, BadRequestException, ConflictException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/user/enums/role.enum';

@Controller('register')
export class RegisterController {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, username, role, password } = createUserDto;

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await this.userService.findOneByEmail(email).catch(() => null);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Créez un nouvel utilisateur

    const hashedPassword = await bcrypt.hash(password, 15);
    const createNewUser: CreateUserDto = { email: email, username: username, password: hashedPassword, role: role || Role.Spectator };
    const newUser = await this.userService.create(createNewUser);

    const payload = { email: newUser.email, sub: newUser.id, username: newUser.username, role: newUser.role };
    console.log('JWT Secret in RegisterController:', process.env.JWT_SECRET || 'defaultSecretKey');
    console.log('Payload:', payload);
    const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET || "banane" });

    return {
      access_token: token,
      expires_in: 3600, // 1 hour
      grant_type: 'password', 
      scope: '' 
    };
  }
}