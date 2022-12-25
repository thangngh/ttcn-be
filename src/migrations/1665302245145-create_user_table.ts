/* eslint-disable @typescript-eslint/no-empty-function */
import { MigrationInterface, QueryRunner } from "typeorm"

export class createUserTable1665302245145 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TYPE "gender_type" AS ENUM('FEMALE', 'MALE')
        `);
        await queryRunner.query(`
        CREATE TYPE "provider_type" AS ENUM('USERNAME', 'GOOGLE', 'FACEBOOK')
        `);

        await queryRunner.query(`
        CREATE TABLE "role" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "createdat" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedat" TIMESTAMP, 
            "deletedat" TIMESTAMP, 
            "name" character varying NOT NULL, 
            CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY ("id")
        )`);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TYPE \"provider_type\"");
        await queryRunner.query("DROP TYPE \"gender_type\"");
        await queryRunner.query(`DROP TABLE "role"`);

    }

}
