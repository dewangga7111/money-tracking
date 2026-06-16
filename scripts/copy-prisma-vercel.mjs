// Waku's Vercel adapter only copies `dist/` (+ `private/`) into the serverless
// function and leaves `node_modules` behind (see
// node_modules/waku/dist/adapters/vercel-build-enhancer.js — there's even a
// `TODO: can use @vercel/nft to packaging with native dependencies`).
//
// Because waku.config.ts keeps `@prisma/client` / `.prisma` EXTERNAL, those
// packages must exist in node_modules at runtime. They don't get shipped, so
// the function crashes with: Cannot find package '@prisma/client'.
//
// This script runs after `waku build` and copies the Prisma client + generated
// engine into the function's node_modules. Node resolves the bare specifier
// `@prisma/client` from /var/task/dist/server/assets/*.js by walking up to
// /var/task/node_modules, which is what `RSC.func/node_modules` becomes.
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

// Skip entirely when not producing a Vercel build.
const funcDir = path.resolve('.vercel', 'output', 'functions', 'RSC.func');
if (!existsSync(funcDir)) {
  console.log('[copy-prisma-vercel] no .vercel/output/functions/RSC.func — skipping');
  process.exit(0);
}

const nodeModules = path.resolve('node_modules');
const destNodeModules = path.join(funcDir, 'node_modules');

// Packages the externalized Prisma runtime needs at runtime.
const packages = ['@prisma/client', '.prisma', '@prisma/engines'];

for (const pkg of packages) {
  const src = path.join(nodeModules, pkg);
  if (!existsSync(src)) {
    if (pkg === '@prisma/engines') continue; // optional in some prisma versions
    console.warn(`[copy-prisma-vercel] WARNING: ${pkg} not found in node_modules`);
    continue;
  }
  const dest = path.join(destNodeModules, pkg);
  mkdirSync(path.dirname(dest), { recursive: true });
  // dereference: copy the real files behind any symlinks (pnpm / hoisting).
  cpSync(src, dest, { recursive: true, dereference: true });
  console.log(`[copy-prisma-vercel] copied ${pkg}`);
}

console.log('[copy-prisma-vercel] done');
