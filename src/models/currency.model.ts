import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Wallet } from './wallet.model';
import { Transaction } from './transaction.model';

@Entity('currencies')
export class Currency {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    code: string;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'int', unique: true })
    displayOrder: number;

    @OneToMany(() => Wallet, (wallet) => wallet.currency)
    wallets: Wallet[];

    @OneToMany(() => Transaction, (transaction) => transaction.currency)
    transactions: Transaction[];
}
