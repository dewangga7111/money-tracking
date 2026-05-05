import { createHmac } from 'crypto';

export const SESSION_COOKIE = 'admin_session';
const SECRET = process.env.SESSION_SECRET || 'waku-admin-secret-change-in-production';
const TTL_MS = 24 * 60 * 60 * 1000; // 1 day

type SessionPayload = {
  userId: string;
  email: string;
  exp: number;
};

export function createSessionToken(userId: string, email: string): string {
  const payload: SessionPayload = { userId, email, exp: Date.now() + TTL_MS };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', SECRET).update(encoded).digest('base64url');
  return `${encoded}.${sig}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [encoded, sig] = token.split('.');
    const expected = createHmac('sha256', SECRET).update(encoded).digest('base64url');
    if (sig !== expected) return null;
    const payload: SessionPayload = JSON.parse(Buffer.from(encoded, 'base64url').toString());
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function sessionCookieHeader(token: string): string {
  const maxAge = 24 * 60 * 60;
  return `${SESSION_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}`;
}

export function clearSessionCookieHeader(): string {
  return `${SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;
}
