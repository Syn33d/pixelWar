import { User } from "src/user/entities/user.entity";
import { Column, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export class PlayerLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable : false})
    userId: number;

    @Column({nullable : false})
    pixels: Array<string>;

    @Column({nullable : false})
    timestamp: Date;

    @ManyToOne(() => User, user => user.playerLog)
    user: User;
}
