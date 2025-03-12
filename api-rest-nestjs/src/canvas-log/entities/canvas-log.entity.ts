import { Canva } from "src/canvas/entities/canva.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class CanvasLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable : false})
    canvaId: number;

    @Column({nullable : false})
    userId: number;

    @Column({nullable : false})
    pixels: Array<string>;

    @Column({nullable : false})
    timestamp: Date;

    @ManyToOne(() => Canva, canva => canva.canvasLog)
    canva: Canva;
}
