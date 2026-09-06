import { MigrationInterface, QueryRunner } from "typeorm";

export class NicknameNullable1785775712516 implements MigrationInterface {
    name = 'NicknameNullable1785775712516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "nickname" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "nickname" SET NOT NULL`);
    }

}
