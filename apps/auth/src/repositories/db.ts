import Knex from 'knex';
import '../types';

export const db = Knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    database: 'auth_demo',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  debug: true,
});
