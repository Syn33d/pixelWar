import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Param,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CreateCanvaDto } from './dto/create-canva.dto';
import { UpdateCanvaDto } from './dto/update-canva.dto';
import { RolesGuard } from 'src/auth/security/roles.guard';
import { Roles } from 'src/auth/security/roles.decorator';
import { Role } from '../user/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/security/auth.guard';

@Controller('canvas')
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) { }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Staff)  
  @Post()
  create(@Body() createCanvaDto: CreateCanvaDto) {
    return this.canvasService.create(createCanvaDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Spectator, Role.Staff)  
  @Get()
  findAll() {
    return this.canvasService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Spectator, Role.Staff)
  @Get(':id')
  getGrid(@Param('id') id: string) {
    return this.canvasService.getGrid(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Spectator, Role.Staff)  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCanvaDto: UpdateCanvaDto) {
    return this.canvasService.update(+id, updateCanvaDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Spectator, Role.Staff)  
  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() updateCanvaDto: UpdateCanvaDto,
  ) {
    return this.canvasService.update(+id, updateCanvaDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Staff)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canvasService.remove(+id);
  }
}
