import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Controller('login')
export class LoginController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.userService.validateUser(body.username, body.password);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { message: 'Login successful' };
  }
}