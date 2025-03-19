import { CanvasLog } from "src/canvas-log/entities/canvas-log.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Canvas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable : false})
    name: string;
    
    @Column({nullable : false})
    width: number;
    
    @Column({nullable : false})
    height: number;
    
    @Column({type: 'json', nullable : false})
    pixels: { color: string }[][];

    @Column({nullable : false})
    createdAt: Date;
    
    @Column({nullable : true})
    updatedAt: Date;

    @ManyToOne(() => User, user => user.canvas)
    user: User;

    @OneToMany(() => CanvasLog, canvasLog => canvasLog.canva)
    canvasLog: CanvasLog;
}
