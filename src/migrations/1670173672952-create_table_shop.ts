import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableShop1670173672952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "shop" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "createdat" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedat" TIMESTAMP, "deletedat" TIMESTAMP, 
            "name" character varying NOT NULL, 
            "description" character varying NOT NULL, 
            "address" jsonb  NULL, 
            "phone" character varying  NULL, 
            "email" character varying NOT NULL,  
            "isActive" boolean NOT NULL DEFAULT false,
            "userid" uuid NOT NULL,
            CONSTRAINT "fK_ee4aefdfghgfff" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
            CONSTRAINT "PK_71ee9725083bac8f639a212d78c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shop"`);
    }

}
