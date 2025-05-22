import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1716391362000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create User table
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`user\` (
                \`idUser\` int NOT NULL AUTO_INCREMENT,
                \`username\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`passwordResetToken\` varchar(255) NULL,
                \`passwordResetExpires\` timestamp NULL,
                \`role\` enum('ADMIN', 'STAFF', 'SPECTATOR') NOT NULL DEFAULT 'SPECTATOR',
                PRIMARY KEY (\`idUser\`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

    // Create Canvas table
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`canvas\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`width\` int NOT NULL,
                \`height\` int NOT NULL,
                \`pixels\` json NOT NULL,
                \`createdAt\` timestamp NOT NULL,
                \`updatedAt\` timestamp NULL,
                \`userId\` int NULL,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`FK_canvas_user\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`idUser\`) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

    // Create CanvasLog table
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`canvas_log\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`canvaId\` int NOT NULL,
                \`userId\` int NOT NULL,
                \`pixels\` json NOT NULL,
                \`timestamp\` timestamp NOT NULL,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`FK_canvas_log_canvas\` FOREIGN KEY (\`canvaId\`) REFERENCES \`canvas\` (\`id\`) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

    // Create PlayerLog table
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`player_log\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`userId\` int NOT NULL,
                \`pixels\` json NOT NULL,
                \`timestamp\` timestamp NOT NULL,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`FK_player_log_user\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`idUser\`) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order to avoid foreign key constraints
    await queryRunner.query(`DROP TABLE IF EXISTS \`player_log\`;`);
    await queryRunner.query(`DROP TABLE IF EXISTS \`canvas_log\`;`);
    await queryRunner.query(`DROP TABLE IF EXISTS \`canvas\`;`);
    await queryRunner.query(`DROP TABLE IF EXISTS \`user\`;`);
  }
}
