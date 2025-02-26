import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PixelService } from './pixel.service';
import { CreatePixelDto } from './dto/create-pixel.dto';
import { UpdatePixelDto } from './dto/update-pixel.dto';

@Controller('pixel')
export class PixelController {
  constructor(private readonly pixelService: PixelService) {}

  @Post()
  create(@Body() createPixelDto: CreatePixelDto) {
    return this.pixelService.create(createPixelDto);
  }

  @Get()
  findAll() {
    return this.pixelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pixelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePixelDto: UpdatePixelDto) {
    return this.pixelService.update(+id, updatePixelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pixelService.remove(+id);
  }
}
