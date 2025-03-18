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
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 3306),
      username: 'root',
      database: 'm1_typescript',
      autoLoadEntities: true,
    }),
    UserModule,
    CanvasModule,
    AuthModule,
    PixelModule,
    LogWarModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
