import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from 'src/shared/entities/currency.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Currency])],
    exports: [TypeOrmModule],
})
export class CurrencyModule {}
