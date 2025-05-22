import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/security/roles.guard';
import { Roles } from 'src/auth/security/roles.decorator';
import { Role } from './enums/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Spectator, Role.Staff)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Spectator, Role.Staff)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Spectator, Role.Staff)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Staff)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Staff)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
