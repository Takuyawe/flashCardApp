import { createCookieSessionStorage } from '@remix-run/node';

const sessionSecret: string | undefined = process.env.SESSION_SECRET;
if (sessionSecret === undefined) throw new Error('SESSION_SECRET must be set');

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
  },
});
