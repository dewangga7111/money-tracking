import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST = 'localhost',
  POSTGRES_PORT = '5432',
  POSTGRES_DB,
} = process.env;

if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DB) {
  throw new Error('Missing database env vars: POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB are required.');
}

const databaseUrl = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: databaseUrl,
  },
});
