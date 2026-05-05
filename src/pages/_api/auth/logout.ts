import { clearSessionCookieHeader } from '@/lib/session';

export const POST = async (): Promise<Response> => {
  return Response.json({ success: true }, {
    headers: { 'Set-Cookie': clearSessionCookieHeader() },
  });
};
