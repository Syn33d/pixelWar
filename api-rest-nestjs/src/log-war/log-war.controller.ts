import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogWarService } from './log-war.service';
import { CreateLogWarDto } from './dto/create-log-war.dto';
import { UpdateLogWarDto } from './dto/update-log-war.dto';

@Controller('log-war')
export class LogWarController {
  constructor(private readonly logWarService: LogWarService) {}

  @Post()
  create(@Body() createLogWarDto: CreateLogWarDto) {
    return this.logWarService.create(createLogWarDto);
  }

  @Get()
  findAll() {
    return this.logWarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logWarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogWarDto: UpdateLogWarDto) {
    return this.logWarService.update(+id, updateLogWarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logWarService.remove(+id);
  }
}
