import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CanvasModule } from './canvas/canvas.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WebsocketModule } from './websocket/websocket.module';
import { CanvasLogModule } from './canvas-log/canvas-log.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Explicitly load the .env file located in the parent directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

@Module({
  imports: [
    // ConfigModule loads environment variables automatically
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../.env'), // Specify the parent directory for .env
      isGlobal: true, // Makes the configuration globally available
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1', // Default to localhost if not set
      port: +(process.env.DB_PORT || 3306), // Convert port to a number
      username: process.env.DB_USERNAME || 'root', // Default to root if not set
      password: process.env.DB_PASSWORD || '', // Default to empty password if not set
      database: process.env.DB_DATABASE || 'test', // Default to test database if not set
      autoLoadEntities: true, // Automatically load entities (useful for development)
      synchronize: false, // Synchronize database schema (use cautiously in production)
    }),
    UserModule,
    CanvasModule,
    AuthModule,
    WebsocketModule,
    CanvasLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
