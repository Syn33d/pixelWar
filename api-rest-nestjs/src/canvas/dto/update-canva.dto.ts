import { PartialType } from '@nestjs/mapped-types';
import { CreateCanvaDto } from './create-canva.dto';

export class UpdateCanvaDto extends PartialType(CreateCanvaDto) {
    id: number;
    updatedAt: Date;
    userId: number;
    pixel: { x: number; y: number; color: string };
}
