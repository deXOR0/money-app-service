import { DataSource, DataSourceOptions } from 'typeorm';
import { configService } from './config/config.service';

require('dotenv').config();

const dataSource = new DataSource(
    configService.getTypeOrmConfigs() as DataSourceOptions,
);
export default dataSource;
