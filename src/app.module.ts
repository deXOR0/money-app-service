import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { WalletModule } from './wallet/wallet.module';
import { UserModule } from './user/user.module';
import { CurrencyModule } from './currency/currency.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
    imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfigs()), AuthorizationModule, WalletModule, UserModule, CurrencyModule, CategoryModule, TransactionModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
