import { PrismaClient } from '@prisma/client';
import { createSessionToken, sessionCookieHeader } from '@/lib/session';

export const POST = async (request: Request): Promise<Response> => {
  const prisma = new PrismaClient();
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.tbUser.findUnique({
      where: { email, status: true },
    });

    if (!user || user.password !== password) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

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
