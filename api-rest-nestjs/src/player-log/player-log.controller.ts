import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayerLogService } from './player-log.service';
import { CreatePlayerLogDto } from './dto/create-player-log.dto';
import { UpdatePlayerLogDto } from './dto/update-player-log.dto';

@Controller('logs/player')
export class PlayerLogController {
  constructor(private readonly playerLogService: PlayerLogService) {}

  @Post()
  create(@Body() createPlayerLogDto: CreatePlayerLogDto) {
    return this.playerLogService.create(createPlayerLogDto);
  }

  @Get()
  findAll() {
    return this.playerLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerLogDto: UpdatePlayerLogDto) {
    return this.playerLogService.update(+id, updatePlayerLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerLogService.remove(+id);
  }
}
