import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { ENVIRONMENT } from './environment.enum';

dotenv.config();

const production: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

const staging: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

const development: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

const automatedTests: DataSourceOptions = {
  type: 'better-sqlite3',
  database: `./data/tests.${Math.random()}.db`,
  synchronize: true,
  dropSchema: false,
  name: process.env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
};

export const datasourceOptions: DataSourceOptions = (() => {
  if (process.env.NODE_ENV === ENVIRONMENT.PRODUCTION) {
    return production;
  }

  if (process.env.NODE_ENV === ENVIRONMENT.STAGING) {
    return staging;
  }

  if (process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT) {
    return development;
  }

  if (process.env.NODE_ENV === ENVIRONMENT.AUTOMATED_TEST) {
    return automatedTests;
  }

  throw new Error('No environment defined');
})();

export default new DataSource({
  ...datasourceOptions,
  entities: [
    join(
      __dirname,
      '../modules/**/infrastructure/persistence/entities/*.entity.ts',
    ),
    join(
      __dirname,
      '../common/infrastructure/**/persistence/entities/*.entity.ts',
    ),
  ],
  migrations: ['./data/migrations/*.ts'],
});
