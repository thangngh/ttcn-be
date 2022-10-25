import { MigrationInterface, QueryRunner } from "typeorm";

export class createOwnerTable1665822532330 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "owner" 
                    ("id" SERIAL PRIMARY KEY,
                    "user_id" uuid NOT NULL,
                    "role" "public"."user_role_type" NOT NULL default 'ADMIN',
                    FOREIGN KEY (user_id) REFERENCES USERS(id))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE \"administrator\"");
    }

}

// administrator