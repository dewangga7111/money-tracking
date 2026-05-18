import { compare } from 'bcryptjs';
import { getPrismaClient } from '@/lib/prisma';
import { createSessionToken, sessionCookieHeader } from '@/lib/session';

// In-memory rate limiter: max 5 attempts per 15 minutes per IP
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { allowed: true, retryAfterSeconds: 0 };
}

function resetRateLimit(ip: string) {
  attempts.delete(ip);
}

export const POST = async (request: Request): Promise<Response> => {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return Response.json(
      { error: `Too many login attempts. Try again in ${rateLimit.retryAfterSeconds} seconds.` },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
    );
  }

  const prisma = getPrismaClient();
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.tbUser.findUnique({
      where: { email, status: true },
    });

    const passwordMatch = user ? await compare(password, user.password) : false;
    if (!user || !passwordMatch) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    resetRateLimit(ip);
    const token = createSessionToken(user.userId, user.email);

    return Response.json({ success: true }, {
      headers: { 'Set-Cookie': sessionCookieHeader(token) },
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
