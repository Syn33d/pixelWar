import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LogWar {
    //Clé primaire générée automatiquement
    @PrimaryGeneratedColumn({name: 'idLogWar'})
    id!: number;

    //Déclaration des colones
    @Column({nullable: false})
    idUser: number;

    @Column({nullable: false})
    idPixel: number;

    @Column({nullable: false})
    color: string;

    @Column({nullable: false})
    placedAt: Date;
}
