#!/bin/sh
set -e

# Symlink uploads into dist/public so waku serves them at /uploads/*
mkdir -p /app/public/uploads
mkdir -p /app/dist/public
ln -sf /app/public/uploads /app/dist/public/uploads

echo "Running database migrations..."
npx prisma migrate deploy

echo "Starting application..."
exec npm start
