import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableProduct1670173698596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "product" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "createdat" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedat" TIMESTAMP, 
            "deletedat" TIMESTAMP, 
            "name" character varying NOT NULL, 
            "description" character varying NOT NULL, 
            "price" integer NOT NULL, 
            "image" jsonb NOT NULL, 
            "quantity" integer NOT NULL, 
            "categoryid" uuid NOT NULL,
            CONSTRAINT "fK_ee4aefdasasadaa" FOREIGN KEY ("categoryid") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
            CONSTRAINT "PK_6e8f75045ddcd1c389c765c896e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
