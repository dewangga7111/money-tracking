import { PrismaClient } from '@prisma/client';

function buildDatabaseUrl(): string {
  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST = 'localhost',
    POSTGRES_PORT = '5432',
    POSTGRES_DB,
  } = process.env;

  if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DB) {
    throw new Error(
      'Missing database env vars. Set POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB (POSTGRES_HOST and POSTGRES_PORT are optional).'
    );
  }

  return `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;
}

export function getPrismaClient(): PrismaClient {
  return new PrismaClient({ datasourceUrl: buildDatabaseUrl() });
}
