import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUnique1785431459303 implements MigrationInterface {
    name = 'AddUnique1785431459303';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "currencies" ADD "display_order" integer NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "currencies" ADD CONSTRAINT "UQ_3a10aa36cee83153e97161ab260" UNIQUE ("display_order")`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ADD CONSTRAINT "UQ_2356e187b2a6e1490e4f06f7508" UNIQUE ("auth0_id")`,
        );
        await queryRunner.query(
            `ALTER TABLE "categories" ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name")`,
        );
        await queryRunner.query(
            `ALTER TABLE "currencies" ADD CONSTRAINT "UQ_9f8d0972aeeb5a2277e40332d29" UNIQUE ("code")`,
        );
        await queryRunner.query(
            `ALTER TABLE "currencies" ADD CONSTRAINT "UQ_976da6960ec4f0c96c26e3dffa0" UNIQUE ("name")`,
        );
        await queryRunner.query(
            `ALTER TABLE "wallets" ADD CONSTRAINT "UQ_25479596de2a2d17fd2a62ba353" UNIQUE ("owner_id", "name")`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "wallets" DROP CONSTRAINT "UQ_25479596de2a2d17fd2a62ba353"`,
        );
        await queryRunner.query(
            `ALTER TABLE "currencies" DROP CONSTRAINT "UQ_976da6960ec4f0c96c26e3dffa0"`,
        );
        await queryRunner.query(
            `ALTER TABLE "currencies" DROP CONSTRAINT "UQ_9f8d0972aeeb5a2277e40332d29"`,
        );
        await queryRunner.query(
            `ALTER TABLE "categories" DROP CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878"`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" DROP CONSTRAINT "UQ_2356e187b2a6e1490e4f06f7508"`,
        );
        await queryRunner.query(
            `ALTER TABLE "categories" DROP CONSTRAINT "UQ_3a10aa36cee83153e97161ab260"`,
        );
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "order"`);
    }
}
