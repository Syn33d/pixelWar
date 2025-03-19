import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CreateCanvaDto } from './dto/create-canva.dto';
import { UpdateCanvaDto } from './dto/update-canva.dto';

@Controller('canvas')
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @Post()
  create(@Body() createCanvaDto: CreateCanvaDto) {
    return this.canvasService.create(createCanvaDto);
  }

  @Get()
  findAll() {
    return this.canvasService.findAll();
  }

  @Get(':id')
  getGrid(@Param('id') id: string) {
    return this.canvasService.getGrid(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCanvaDto: UpdateCanvaDto) {
    return this.canvasService.update(+id, updateCanvaDto);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() updateCanvaDto: UpdateCanvaDto,
  ) {
    return this.canvasService.update(+id, updateCanvaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canvasService.remove(+id);
  }
}
