import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableArticle1733863160604 implements MigrationInterface {
  name = 'AddTableArticle1733863160604';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "article" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "udatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "content" character varying NOT NULL,
                "tags" character varying NOT NULL,
                "sign" character varying NOT NULL,
                CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "article"
        `);
  }
}
