export class CreateCanvasLogDto {
    canvaId: number;
    userId: number;
    pixels: { x: number; y: number; color: string };
    timestamp: Date;
}
