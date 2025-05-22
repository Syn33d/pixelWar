export class CreateCanvaDto {
    name: string;
    width: number;
    height: number;
    pixels: { color: string }[][];
    createdAt: Date;
}
