import { MigrationInterface, QueryRunner } from "typeorm";

export class createDatabase1669038790649 implements MigrationInterface {
    name = 'createDatabase1669038790649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "common_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, CONSTRAINT "PK_7fec8b23c7862968df32e9abeff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "fullName" json NOT NULL, "gender" "public"."gender_type" NOT NULL, "providerType" "public"."provider_type" NOT NULL DEFAULT 'USERNAME', "address" json NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "securityCode" character varying NOT NULL, "avatarPath" character varying NOT NULL, "avatarThumbnailPath" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "username" character varying NOT NULL,"role" "public"."user_role_type" NOT NULL DEFAULT 'ROOT',  "password" character varying NOT NULL, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopper" ("id" SERIAL NOT NULL, "userId" uuid NOT NULL, "role" "public"."user_role_type" NOT NULL DEFAULT 'SHOPPER', CONSTRAINT "REL_001970891cc45e267df6aee9a8" UNIQUE ("userId"), CONSTRAINT "PK_f042d01b20b9f68e0e93f84c716" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "userId" uuid NOT NULL, "role" "public"."user_role_type" NOT NULL DEFAULT 'USER', CONSTRAINT "REL_b8512aa9cef03d90ed5744c94d" UNIQUE ("userId"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usersessionhistory" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, CONSTRAINT "PK_c42067021099f93087dbaa3134d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shopper" ADD CONSTRAINT "FK_001970891cc45e267df6aee9a8f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_b8512aa9cef03d90ed5744c94d7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_b8512aa9cef03d90ed5744c94d7"`);
        await queryRunner.query(`ALTER TABLE "shopper" DROP CONSTRAINT "FK_001970891cc45e267df6aee9a8f"`);
        await queryRunner.query(`DROP TABLE "usersessionhistory"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TYPE "public"."customers_role_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_providertype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`DROP TABLE "shopper"`);
        await queryRunner.query(`DROP TYPE "public"."shopper_role_enum"`);
        await queryRunner.query(`DROP TABLE "common_entity"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
