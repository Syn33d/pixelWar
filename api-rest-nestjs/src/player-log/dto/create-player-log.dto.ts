export class CreatePlayerLogDto {
    userId: number;
    pixels: { x: number; y: number; color: string };
    timestamp: Date;
}
