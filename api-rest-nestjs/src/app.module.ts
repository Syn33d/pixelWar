import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CanvasModule } from './canvas/canvas.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    //Chargement des variables d'environnement à partir du fichier .env
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    //Configuration de la connexion à la BDD
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 3306),
      username: 'root',
      database: 'm1_typescript',
      autoLoadEntities: true,
      synchronize: true,
    }),
    //Import des modules 
    UserModule, CanvasModule, AuthModule,WebsocketModule
  ],

  //Déclarations des controllers et des fournisseurs de services
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
