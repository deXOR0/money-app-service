import { MigrationInterface, QueryRunner } from 'typeorm';

const currencies = [
    { code: 'IDR', name: 'Indonesian Rupiah' },
    { code: 'USD', name: 'United States Dollar' },
    { code: 'SGD', name: 'Singaporean Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'DKK', name: 'Danish Krone' },
    { code: 'SEK', name: 'Swedish Krona' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'NZD', name: 'New Zealand Dollar' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'HKD', name: 'Hong Kong Dollar' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'SAR', name: 'Saudi Riyal' },
    { code: 'CNY', name: 'Chinese Yuan Renminbi' },
    { code: 'MYR', name: 'Malaysian Ringgit' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'KRW', name: 'South Korean Won' },
    { code: 'AED', name: 'Emirati Dirham' },
];

export class SeedInitialCurrencies1785431522197 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        currencies.forEach(async (currency, index) => {
            await queryRunner.query(`
                    INSERT INTO currencies (id, code, name, display_order) VALUES
                        (gen_random_uuid(), '${currency.code}', '${currency.name}', ${index})
                    ON CONFLICT DO NOTHING;
                `);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                DELETE FROM currencies 
                WHERE name IN (${currencies.map((currency) => `'${currency.name.replace(/'/g, "''")}'`).join(', ')});
            `);
    }
}
