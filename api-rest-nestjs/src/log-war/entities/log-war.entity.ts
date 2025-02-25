import { Pixel } from "../../pixel/entities/pixel.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LogWar {
    //Clé primaire générée automatiquement
    @PrimaryGeneratedColumn({name: 'idLogWar'})
    id!: number;

    //Déclaration des colones pour établir un journal de log
    @Column({nullable: false})
    idUser: number;

    @Column({nullable: false})
    idPixel: number;

    @Column({nullable: false})
    color: string;

    @Column({nullable: false})
    placedAt: Date;

    //Déclaration de la relation entre les entités LogWar et User (un log est associé à un utilisateur et un seul)
    @ManyToOne(() => User, user => user.id)
    user: User;

    //Déclaration de la relation entre les entités LogWar et Pixel (un log est associé à un pixel et un seul)
    @ManyToOne(() => Pixel, pixel => pixel.id)
    pixel: Pixel;
}
