import { DataSource } from "typeorm";
import { config } from "dotenv";

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 3306),
  username: 'root',
  database: 'm1_typescript',
  entities: [__dirname+"../**/*.entity.ts"],

  migrationsRun: true,
  migrations: [__dirname+"/migrations/*.ts"]
});