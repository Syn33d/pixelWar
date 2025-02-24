import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
