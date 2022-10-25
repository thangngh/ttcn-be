import { MigrationInterface, QueryRunner } from "typeorm";

export class createShipperTable1665822781221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "shipper"
                    ("id" serial NOT NULL PRIMARY KEY,
                    "citizen_identification" text NOT NULL,
                    "is_ready" boolean NOT NULL default false,
--                  "type" text,
--                  "salary" text,
                    "rating" FLOAT,
                    "role" "public"."user_role_type" NOT NULL DEFAULT 'EMPLOYEE',
                    "user_id" uuid,
                    FOREIGN KEY (user_id) REFERENCES USERS(id))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE \"shipper\"");
    }

}
