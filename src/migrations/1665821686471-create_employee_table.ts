import { MigrationInterface, QueryRunner } from "typeorm";

export class createEmployeeTable1665821686471 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "employee"
                    ("id" serial NOT NULL PRIMARY KEY,
                    "citizen_identification" text NOT NULL,
                    "hour_worked" INT,
--                  "type" text,
                    "salary" text,
                    "time_off" INT,
                    "rating" FLOAT,
                    "role" "public"."user_role_type" NOT NULL DEFAULT 'EMPLOYEE',
                    "user_id" uuid,
                    FOREIGN KEY (user_id) REFERENCES USERS(id))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE \"employee\"");
    }

}
