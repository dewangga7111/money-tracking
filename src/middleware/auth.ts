import type { MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';
import { SESSION_COOKIE, verifySessionToken } from '../lib/session';

const PUBLIC_PATHS = ['/login', '/'];
const SKIP_PREFIXES = ['/_waku', '/images', '/favicon', '/auth/'];

const auth = (): MiddlewareHandler => {
  return async (c, next) => {
    const path = new URL(c.req.url).pathname;

    if (SKIP_PREFIXES.some((p) => path.startsWith(p))) {
      return next();
    }

    const token = getCookie(c, SESSION_COOKIE);
    const session = token ? verifySessionToken(token) : null;

    // / or /admin → redirect based on session
    if (path === '/' || path === '/admin') {
      const location = session ? '/users' : '/login';
      c.res = new Response(null, { status: 302, headers: { Location: location } });
      return;
    }

    // Already logged in → skip login page
    if (path === '/login' && session) {
      c.res = new Response(null, { status: 302, headers: { Location: '/users' } });
      return;
    }

    // Protected route → require session
    if (!PUBLIC_PATHS.includes(path) && !session) {
      c.res = new Response(null, { status: 302, headers: { Location: '/login' } });
      return;
    }

    return next();
  };
};

export default auth;
