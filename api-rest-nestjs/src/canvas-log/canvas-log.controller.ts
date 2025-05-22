import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CanvasLogService } from './canvas-log.service';
import { CreateCanvasLogDto } from './dto/create-canvas-log.dto';
import { UpdateCanvasLogDto } from './dto/update-canvas-log.dto';

@Controller('log/canvas')
export class CanvasLogController {
  constructor(private readonly canvasLogService: CanvasLogService) {}

  @Post()
  create(@Body() createCanvasLogDto: CreateCanvasLogDto) {
    return this.canvasLogService.create(createCanvasLogDto);
  }

  @Get()
  findAll() {
    return this.canvasLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.canvasLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCanvasLogDto: UpdateCanvasLogDto) {
    return this.canvasLogService.update(+id, updateCanvasLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canvasLogService.remove(+id);
  }
}
