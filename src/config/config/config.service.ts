import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from 'src/models/category.model';
import { Currency } from 'src/models/currency.model';
import { User } from 'src/models/user.model';
import { Wallet } from 'src/models/wallet.model';
import { Transaction } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

require('dotenv').config();

class ConfigService {
    getTypeOrmConfigs(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            entities: [__dirname + '/**/models/*.model.ts'],
            namingStrategy: new SnakeNamingStrategy(),
        };
    }
}

const configService = new ConfigService();

export { configService };
