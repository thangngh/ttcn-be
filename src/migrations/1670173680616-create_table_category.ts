import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableCategory1670173680616 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "category" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "createdat" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedat" TIMESTAMP, 
            "deletedat" TIMESTAMP, 
            "name" character varying NOT NULL, 
            "shopid" uuid NOT NULL,
            CONSTRAINT "fK_ee4aefdasdasd112f" FOREIGN KEY ("shopid") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
            CONSTRAINT "PK_1a38b9007ed8afab85026703a53" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
