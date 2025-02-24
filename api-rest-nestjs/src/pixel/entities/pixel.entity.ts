import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pixel {
    //Clé primaire générée automatiquement
    @PrimaryGeneratedColumn({name: 'idPixel'})
    id!: number;

    //Déclaration des colones
    @Column({nullable: false})
    x: number;

    @Column({nullable: false})
    y: number;
}
