import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';
import { Category } from './category.e';
import { Currency } from './currency.entity';

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    walletId: string;

    @Column()
    categoryId: string;

    @Column()
    currencyId: string;

    @Column()
    date: Date;

    @Column({ type: 'decimal', precision: 12, scale: 4 })
    exchangeRate: number;

    @Column({ type: 'decimal', precision: 12, scale: 4 })
    amount: number;

    @Column({ type: 'text' })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
    @JoinColumn({ name: 'wallet_id' })
    wallet: Wallet;

    @ManyToOne(() => Category, (category) => category.transactions)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => Currency, (currency) => currency.transactions)
    @JoinColumn({ name: 'currency_id' })
    currency: Currency;
}
