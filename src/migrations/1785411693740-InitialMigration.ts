import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1785411693740 implements MigrationInterface {
    name = 'InitialMigration1785411693740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "icon" character varying(8) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "icon" character varying(2) NOT NULL`);
    }

}
