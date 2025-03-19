import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  //Importation du module TypeOrmModule pour les entités User
  imports: [TypeOrmModule.forFeature([User])],

  //Liste des controllers et des fournisseurs de services
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
