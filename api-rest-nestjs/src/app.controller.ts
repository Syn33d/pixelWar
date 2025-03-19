import { Controller, Get, Post, Body } from '@nestjs/common';
import { CanvasLogService } from './canvas-log/canvas-log.service';
import { CreateCanvasLogDto } from './canvas-log/dto/create-canvas-log.dto';

@Controller()
export class AppController {
  constructor(private readonly canvasLogService: CanvasLogService) {}

  @Get('canvas-log')
  async getCanvasLog() {
    return await this.canvasLogService.findAll();
  }

  @Post('canvas-log')
  async createCanvasLog(@Body() createCanvasLogDto: CreateCanvasLogDto) {
    return await this.canvasLogService.create(createCanvasLogDto);
  }
}
