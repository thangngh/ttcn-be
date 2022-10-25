import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableAdministrator1666618660568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "administrator" 
                    ("user_name" text NOT NULL primary key default 'admin',
                    "pass_word" text NOT NULL default 'admin',
                    "role" "public"."user_role_type" NOT NULL DEFAULT 'ROOT')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE \"administrator\"");
    }

}
