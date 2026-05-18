import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'waku/config';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prisma's CJS client uses `__dirname` and a non-standard ESM specifier
// (`.prisma/client/default`). Bundling it into ESM breaks both. This plugin
// forces every Prisma-related import to stay external so Node loads them
// via CJS interop at runtime, where everything works as Prisma expects.
function externalizePrismaPlugin(): Plugin {
  const isPrisma = (id: string) =>
    id === '@prisma/client' ||
    id.startsWith('@prisma/client/') ||
    id === '.prisma/client/default' ||
    id.startsWith('.prisma/');

  return {
    name: 'externalize-prisma',
    enforce: 'pre',
    resolveId(id) {
      if (isPrisma(id)) {
        return { id, external: true };
      }
    },
  };
}

export default defineConfig({
  vite: {
    ssr: {
      external: ['@prisma/client', '.prisma/client/default'],
      noExternal: [],
    },
    plugins: [
      externalizePrismaPlugin(),
      tailwindcss(),
      react({
        babel: {
          plugins: ['babel-plugin-react-compiler'],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
