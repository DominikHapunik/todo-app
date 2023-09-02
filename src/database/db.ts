import knex from 'knex'
import configs from './knexfile';
import { DatabaseEnum } from '../enums/database.enum';

const config = configs[process.env.NODE_ENV || 'development']

export const database = () => knex(config);

export const databaseTodoTabel = () => database().table(DatabaseEnum.DATABASE_TODO_TABLE_NAME);

export const databaseUsersTabel = () => database().table(DatabaseEnum.DATABASE_USER_TABLE_NAME);