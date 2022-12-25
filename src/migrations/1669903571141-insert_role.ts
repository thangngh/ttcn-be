import { MigrationInterface, QueryRunner } from "typeorm";

export class insertRole1669903571141 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO role (name) values ('customer');
        INSERT INTO role (name) values ('shopper');
        INSERT INTO role (name) values ('admin');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM role");
    }

}
