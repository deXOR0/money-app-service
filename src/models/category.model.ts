import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CashFlowType } from './enums';
import { Transaction } from './transaction.model';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('varchar', { length: 8 })
    icon: string;

    @Column({
        type: 'enum',
        enum: CashFlowType,
        default: CashFlowType.Outflow,
    })
    cashFlowType: CashFlowType;

    @Column({ nullable: true })
    superCategoryId: string;

    @ManyToOne(() => Category, (category) => category.subCategories, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'super_category_id' })
    superCategory: Category;

    @OneToMany(() => Category, (category) => category.superCategory)
    subCategories: Category[];

    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions: Transaction[];
}
