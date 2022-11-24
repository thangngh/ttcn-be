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
        CREATE TYPE "user_role_type" AS ENUM('USER', 'SHOPPER', 'ROOT')`
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TYPE \"user_role_type\"");
        await queryRunner.query("DROP TYPE \"provider_type\"");
        await queryRunner.query("DROP TYPE \"gender_type\"");

    }

}
