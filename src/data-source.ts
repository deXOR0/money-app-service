import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

require('dotenv').config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'mydb',

    // Direct class references work reliably for migrations in CLI context
    entities: [__dirname + '/models/*.model.ts'],

    // Point to where your migration files are stored
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    namingStrategy: new SnakeNamingStrategy(),
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
