/* eslint-disable @typescript-eslint/no-empty-function */
import { MigrationInterface, QueryRunner } from "typeorm"

export class createUserTable1665302245145 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TYPE "sex_type" AS ENUM('FEMALE', 'MALE')
        `);
        await queryRunner.query(`
        CREATE TYPE "provider_type" AS ENUM('USERNAME', 'GOOGLE', 'FACEBOOK')
        `);
        await queryRunner.query(`
        CREATE TYPE "user_role_type" AS ENUM('USER', 'EMPLOYEE', 'ADMIN', 'ROOT')`
        );
        await queryRunner.query(`
        CREATE TABLE "users" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "full_name" json NOT NULL,
            "sex" "sex_type" NULL, 
            "provider_type" "provider_type" NULL, 
            "address" json  NULL, 
            "phone" text  NULL,
            "email" text  NULL, 
--          "email_verified" boolean NULL, 
            "user_name" text NOT NULL,
            "pass_word" text NOT NULL, 
            "security_code" text NULL, 
--          "user_role" "user_role_type" NOT NULL,
            "avatar_path" text NULL, 
            "avatar_thumbnail_path" text NULL, 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP ,
            CONSTRAINT "PK_8d93d6490c0f84e314a907d6b0b" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE \"user\"");
        await queryRunner.query("DROP TYPE \"user_role_type\"");
        await queryRunner.query("DROP TYPE \"provider_type\"");
        await queryRunner.query("DROP TYPE \"\sex_type\"");

    }

}
