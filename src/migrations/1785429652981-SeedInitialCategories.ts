import { CashFlowType } from 'src/models/enums';
import { MigrationInterface, QueryRunner } from 'typeorm';

const categories = [
    {
        name: 'Food & Drinks',
        icon: '🍽️',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Groceries',
        icon: '🛒',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Shopping',
        icon: '🛍️',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Fuel',
        icon: '⛽',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Transportation',
        icon: '🚌',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Bill',
        icon: '📒',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Family & Friends',
        icon: '👨‍👩‍👧',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Entertainment',
        icon: '🎠',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Education',
        icon: '🎓',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Beauty',
        icon: '💄',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Health',
        icon: '🩺',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Insurance',
        icon: '🛡️',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Donation',
        icon: '🫴',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Pet',
        icon: '🐾',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Sport',
        icon: '🎾',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Vacation',
        icon: '🏝️',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Clothing',
        icon: '👕',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Technology',
        icon: '💻',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Investation',
        icon: '🪴',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Other',
        icon: '💸',
        cashFlowType: 'EXPENSE',
    },
    {
        name: 'Salary',
        icon: '💰',
        cashFlowType: 'INCOME',
    },
    {
        name: 'Bonus',
        icon: '➕',
        cashFlowType: 'INCOME',
    },
    {
        name: 'Investation Return',
        icon: '🌻',
        cashFlowType: 'INCOME',
    },
    {
        name: 'Other Income',
        icon: '🤑',
        cashFlowType: 'INCOME',
    },
];

const subCategories = [
    {
        name: 'Service',
        icon: '🔧',
        superCategory: 'Transportation',
    },
    {
        name: 'Date',
        icon: '💕',
        superCategory: 'Entertainment',
    },
    {
        name: 'Balancing',
        icon: '⚖️',
        superCategory: 'Other',
    },
    {
        name: 'Transaction Fee',
        icon: '💵',
        superCategory: 'Other',
    },
    {
        name: 'Debt',
        icon: '🪙',
        superCategory: 'Other',
    },
    {
        name: 'Receivable',
        icon: '🙏',
        superCategory: 'Other Income',
    },
];

export class SeedInitialCategories1785429652981 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        categories.forEach(async (category) => {
            await queryRunner.query(`
                INSERT INTO categories (id, name, icon, cash_flow_type) VALUES
                    (gen_random_uuid(), '${category.name}', '${category.icon}', '${category.cashFlowType}')
                ON CONFLICT DO NOTHING;
            `);
        });

        subCategories.forEach(async (subCategory) => {
            await queryRunner.query(`
                INSERT INTO categories (id, name, icon, cash_flow_type, super_category_id) VALUES
                    (gen_random_uuid(), '${subCategory.name}', '${subCategory.icon}', (SELECT cash_flow_type FROM categories WHERE name = '${subCategory.superCategory}' LIMIT 1), (SELECT id FROM categories WHERE name = '${subCategory.superCategory}' LIMIT 1))
                ON CONFLICT DO NOTHING;
            `);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM categories 
            WHERE name IN (${categories.map((category) => category.name).join(', ')});
        `);
    }
}
