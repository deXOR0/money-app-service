import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { CurrencyModule } from 'src/currency/currency.module';
import { Transaction } from 'src/shared/entities/transaction.entity';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction]),
        WalletModule,
        CategoryModule,
        CurrencyModule,
    ],
})
export class TransactionModule {}
