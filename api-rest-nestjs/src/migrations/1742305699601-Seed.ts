import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1742305699601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //Insere des utilisateurs
    await queryRunner.query(`
            INSERT INTO user (username, password, email, role)
            VALUES ('user1', 'hash1', 'user1@example.com', 'Admin'),
                   ('user2', 'hash2', 'user2@example.com', 'Staff');
        `);

    //Insere un canva
    const pixels = JSON.stringify(
      Array.from({ length: 30 }, () =>
        Array.from({ length: 30 }, () => ({ color: '#FFFFFF' })),
      ),
    );

    await queryRunner.query(`
            INSERT INTO canvas (name, width, height, pixels, createdAt, userId)
            VALUES ('MyCanvas', 30, 30, '${pixels}', NOW(), 1);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //Supprime les données insérées
    await queryRunner.query(`DELETE FROM canvas;`);
    await queryRunner.query(`DELETE FROM user;`);
  }
}
