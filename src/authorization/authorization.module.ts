import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Wallet } from 'src/shared/entities/wallet.entity';
import { Currency } from 'src/shared/entities/currency.entity';
import { Transaction } from 'src/shared/entities/transaction.entity';
import { Category } from 'src/shared/entities/category.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Wallet,
            Currency,
            Transaction,
            Category,
        ]),
    ],
    controllers: [AuthorizationController],
    providers: [AuthorizationService],
})
export class AuthorizationModule {}
