import { Canvas } from "src/canvas/entities/canvas.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CanvasLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable : false})
    canvaId: number;

    @Column({nullable : false})
    userId: number;

    @Column({type: 'json', nullable : false})
    pixels: string[];

    @Column({nullable : false})
    timestamp: Date;

    @ManyToOne(() => Canvas, canva => canva.canvasLog)
    canva: Canvas;
}
