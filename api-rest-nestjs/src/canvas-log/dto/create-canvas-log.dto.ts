import { IsInt, IsObject, IsDate } from 'class-validator';

export class CreateCanvasLogDto {
  @IsInt()
  canvaId: number;

  @IsInt()
  userId: number;

  @IsObject()
  pixels: { x: number; y: number; color: string };

  @IsDate()
  timestamp: Date;
}
