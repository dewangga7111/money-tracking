import { unstable_getContext } from 'waku/server';
import { SESSION_COOKIE, verifySessionToken } from './session';

export type SessionPayload = {
  userId: string;
  email: string;
  exp: number;
};

export function getSessionFromContext(): SessionPayload | null {
  try {
    const { req } = unstable_getContext();
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
    const token = match?.[1];
    return token ? verifySessionToken(token) : null;
  } catch {
    return null;
  }
}

export function requireAuth(): SessionPayload {
  const session = getSessionFromContext();
  if (!session) throw new Error('Unauthorized');
  return session;
}
