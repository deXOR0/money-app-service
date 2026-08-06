import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Wallet } from 'src/shared/entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { CurrencyModule } from 'src/currency/currency.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Wallet]),
        UserModule,
        CurrencyModule,
        AuthorizationModule,
    ],
    controllers: [WalletController],
    providers: [WalletService],
    exports: [TypeOrmModule],
})
export class WalletModule {}
