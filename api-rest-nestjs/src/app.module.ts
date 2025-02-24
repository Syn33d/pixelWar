import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CanvasModule } from './canvas/canvas.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixelModule } from './pixel/pixel.module';
import { LogWarModule } from './log-war/log-war.module';
import { ConfigModule } from '@nestjs/config';

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
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    //Import des modules 
    UserModule, CanvasModule, AuthModule, PixelModule, LogWarModule
  ],

  //Déclarations des controllers et des fournisseurs de services
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
