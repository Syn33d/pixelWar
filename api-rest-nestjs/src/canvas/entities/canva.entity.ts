import { CanvasLog } from "src/canvas-log/entities/canvas-log.entity";
import { User } from "src/user/entities/user.entity";
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Canva {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable : false})
    name: string;
    
    @Column({nullable : false})
    width: number;
    
    @Column({nullable : false})
    height: number;
    
    @Column({nullable : false})
    pixels: Array<string>;

    @Column({nullable : false})
    createdAt: Date;
    
    @Column({nullable : true})
    updatedAt: Date;

    @ManyToOne(() => User, user => user.canva)
    user: User;

    @OneToMany(() => CanvasLog, canvasLog => canvasLog.canva)
    canvasLog: CanvasLog;
}
