import { DataSource } from 'typeorm';

import { config } from 'dotenv';

import * as migrations from 'db/migrations';

import * as entities from '../entities';

config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.DB_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [...Object.values(entities)],
  migrations: [...Object.values(migrations)],
  synchronize: false,
  migrationsRun: true,
  logging: true,
});

export default dataSource;
