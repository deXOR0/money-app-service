import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

require('dotenv').config();

class ConfigService {
    getTypeOrmConfigs(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: process.env.DATABASE_HOST || 'localhost',
            port: Number(process.env.DATABASE_PORT) || 5432,
            username: process.env.DATABASE_USERNAME || 'postgres',
            password: process.env.DATABASE_PASSWORD || 'postgres',
            database: process.env.DATABASE_NAME || 'mydb',
            entities: [__dirname + '/../models/*.model.ts'],
            migrations: [__dirname + '/../migrations/*{.ts,.js}'],
            migrationsTableName: 'migrations',
            namingStrategy: new SnakeNamingStrategy(),
        };
    }
}

const configService = new ConfigService();

export { configService };
