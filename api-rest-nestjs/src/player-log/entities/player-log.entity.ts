import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlayerLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable : false})
    userId: number;

    @Column({type: 'json', nullable : false})
    pixels: string[];

    @Column({nullable : false})
    timestamp: Date;

    @ManyToOne(() => User, user => user.playerLog)
    user: User;
}
