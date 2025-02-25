import { LogWar } from "../../log-war/entities/log-war.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pixel {
    //Clé primaire générée automatiquement
    @PrimaryGeneratedColumn({name: 'idPixel'})
    id!: number;

    //Déclaration des colones de coordonnées
    @Column({nullable: false})
    x: number;

    @Column({nullable: false})
    y: number;

    //Déclaration de la relation entre les entités Pixel et LogWar (un pixel peut être modifié par plusieurs logs)
    @OneToMany(() => LogWar, logWar => logWar.pixel)
    logWars: LogWar[];
}
