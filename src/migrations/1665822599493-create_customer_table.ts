import { MigrationInterface, QueryRunner } from "typeorm";

export class createCustomerTable1665822599493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "customer"(
                    "id" SERIAL PRIMARY KEY,
                    "role" "public"."user_role_type" NOT NULL DEFAULT 'USER',
                    "user_id" uuid NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES USERS(id)
                    )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE \"customer\"");
    }

}
