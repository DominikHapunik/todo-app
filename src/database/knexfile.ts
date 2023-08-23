import { Knex } from "knex";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '../config/index';
// Update with your config settings.

const configs: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      charset: 'utf8',
      timezone: 'UTC',
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: parseInt(DB_PORT!),
      database: DB_DATABASE,
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
    },
  }
};

export default configs;
