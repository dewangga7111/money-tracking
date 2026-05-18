import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST = 'localhost',
  POSTGRES_PORT = '5432',
  POSTGRES_DB,
} = process.env;

// Set DATABASE_URL for Prisma CLI (schema.prisma reads it via env("DATABASE_URL")).
// Falls back to a placeholder during docker build when no DB vars are available —
// prisma generate only reads the schema structure, it never connects to the DB.
process.env.DATABASE_URL =
  POSTGRES_USER !== undefined && POSTGRES_PASSWORD !== undefined && POSTGRES_DB !== undefined
    ? `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`
    : 'postgresql://localhost/placeholder';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
