import { PartialType } from '@nestjs/mapped-types';
import { CreateCanvasLogDto } from './create-canvas-log.dto';

export class UpdateCanvasLogDto extends PartialType(CreateCanvasLogDto) {}
