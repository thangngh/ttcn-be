import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableProductShop1670173702859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "product_shop" (
            "id" SERIAL NOT NULL, 
            "createdat" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedat" TIMESTAMP, 
            "deletedat" TIMESTAMP, 
            "productid" uuid NOT NULL, 
            "shopid" uuid NOT NULL,
            CONSTRAINT "fK_ee4aefdasdasd1dad12f" FOREIGN KEY ("productid") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
            CONSTRAINT "fK_ee4aefdasdasd1adaq12f" FOREIGN KEY ("shopid") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
            CONSTRAINT "PK_1a38b9007ed8afab85026703a51233" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product_shop"`);
    }

}
