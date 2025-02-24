import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    //Clé primaire générée automatiquement
    @PrimaryGeneratedColumn({name: 'idUser'})
    id!: number;

    //Déclaration des colones
    @Column({nullable: false})
    username: string;

    @Column({nullable: false})
    hash: string;

    @Column({nullable: false})
    email: string;

    //Déclaration du token de réinitialisation du mot de passe
    @Column({nullable: true})
    passwordResetToken: string;

    //Déclaration de la date d'expiration du token
    @Column({ type: 'timestamp', nullable: true })
    passwordResetExpires: Date;
}
