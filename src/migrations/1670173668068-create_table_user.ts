import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableUser1670173668068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "user" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "createdat" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedat" TIMESTAMP, 
            "deletedat" TIMESTAMP, 
            "firstname" character varying NOT NULL, 
            "lastname" character varying NOT NULL, 
            "gender" "public"."gender_type" NULL, 
            "providertype" "public"."provider_type" NOT NULL DEFAULT 'USERNAME', 
            "address" jsonb NOT NULL, 
            "phone" character varying NOT NULL, 
            "email" character varying NOT NULL, 
            "username" character varying NOT NULL, 
            "password" character varying NOT NULL, 
            "avatar" character varying  NULL, 
            "isactive" boolean NOT NULL DEFAULT true, 
            "roleid" uuid NOT NULL, 
            CONSTRAINT "fK_8d93d6e54a862e9b2a9c0" FOREIGN KEY ("roleid") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
            CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
