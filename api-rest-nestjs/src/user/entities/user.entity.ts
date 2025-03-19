import { Canvas } from 'src/canvas/entities/canvas.entity';
import { PlayerLog } from 'src/player-log/entities/player-log.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'idUser' })
  id!: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  hash: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpires: Date;

  @OneToMany(() => Canvas, (canvas) => canvas.user)
  canvas: Canvas[];

  @OneToMany(() => PlayerLog, (playerLog) => playerLog.user)
  playerLog: PlayerLog;
}
