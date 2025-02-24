import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CanvasModule } from './canvas/canvas.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixelModule } from './pixel/pixel.module';
import { LogWarModule } from './log-war/log-war.module';

@Module({
  imports: [
    //Configuration de la connexion à la BDD
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 3306),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }),
    //Import des modules 
    UserModule, CanvasModule, AuthModule, PixelModule, LogWarModule
  ],

  //Liste des controllers et services
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
