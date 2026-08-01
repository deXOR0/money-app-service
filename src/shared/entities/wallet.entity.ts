import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.model';
import { Currency } from './currency.entity';
import { Transaction } from './transaction.entity';

@Entity('wallets')
@Unique(['ownerId', 'name'])
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ownerId: string;

    @Column()
    currencyId: string;

    @Column()
    name: string;

    @Column({ type: 'varchar', length: 8 })
    icon: string;

    @Column()
    balance: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.wallets)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @ManyToOne(() => Currency, (currency) => currency.wallets)
    @JoinColumn({ name: 'currency_id' })
    currency: Currency;

    @OneToMany(() => Transaction, (transaction) => transaction.wallet)
    transactions: Transaction[];
}
