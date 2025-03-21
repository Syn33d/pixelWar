import { DataSource } from "typeorm";
import { config } from "dotenv";

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname+"/**/*.entity.ts"],
  migrationsRun: true,
  migrations: [__dirname+"/migrations/*.ts"]
});