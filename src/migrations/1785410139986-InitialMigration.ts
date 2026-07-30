import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1785410139986 implements MigrationInterface {
    name = 'InitialMigration1785410139986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_b69c4f2a8912db088eac0cda7f7"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_a88f466d39796d3081cf96e1b66"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_86e965e74f9cc66149cf6c90f64"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_89de751d3265e411a089b8e407f"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_342cecf691b0d12172e69b2b8f9"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_57ced1bbf241ff1451bb2ccfddf"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "superCategoryId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "walletId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "currencyId"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "currencyId"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "super_category_id"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "super_category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "wallet_id"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "wallet_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "category_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "currency_id"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "currency_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "owner_id"`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "owner_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "currency_id"`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "currency_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_28ba7e1f475fcf1e1b6221b1d02" FOREIGN KEY ("super_category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_0b171330be0cb621f8d73b87a9e" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_c9e41213ca42d50132ed7ab2b0f" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_b515faccedf1dc36ac4f78acc04" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_1ba9a6e15c4a588af6233304ab0" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_b3167c57663ae949d67436465b3" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_b3167c57663ae949d67436465b3"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_1ba9a6e15c4a588af6233304ab0"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_b515faccedf1dc36ac4f78acc04"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_c9e41213ca42d50132ed7ab2b0f"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_0b171330be0cb621f8d73b87a9e"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_28ba7e1f475fcf1e1b6221b1d02"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "currency_id"`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "currency_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "owner_id"`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "owner_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "currency_id"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "currency_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "category_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "wallet_id"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "wallet_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "super_category_id"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "super_category_id" character varying`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "currencyId" uuid`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "currencyId" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "walletId" uuid`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "superCategoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_57ced1bbf241ff1451bb2ccfddf" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_342cecf691b0d12172e69b2b8f9" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_89de751d3265e411a089b8e407f" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_86e965e74f9cc66149cf6c90f64" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_a88f466d39796d3081cf96e1b66" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_b69c4f2a8912db088eac0cda7f7" FOREIGN KEY ("superCategoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
