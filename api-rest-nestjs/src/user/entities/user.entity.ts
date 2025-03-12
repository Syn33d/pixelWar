import { Canva } from "src/canvas/entities/canva.entity";
import { PlayerLog } from "src/player-log/entities/player-log.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    //Déclaration de la relation entre les entités User et Canva (un utilisateur peut modifier plusieurs canvas)
    @OneToMany(() => Canva, canva => canva.user)
    canva: Canva[];

    //Déclaration de la relation entre les entités User et PlayerLog (un utilisateur est à l'origine de plusieurs logs)
    @OneToMany(() => PlayerLog, playerLog => playerLog.user)
    playerLog: PlayerLog;
}
