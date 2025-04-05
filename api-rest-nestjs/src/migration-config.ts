import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

// Explicitly load the .env file located in the parent directory
config({ path: path.resolve(__dirname, '../../.env') });

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '../**/*.entity.ts'],

  migrationsRun: true,
  migrations: [__dirname + '/migrations/*.ts'],
});
