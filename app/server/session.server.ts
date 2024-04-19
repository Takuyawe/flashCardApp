import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { SESSION_ID } from '../constants/Authentication';

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

export const createUserSession = async (
  userId: string,
  redirectPath: string
) => {
  const session = await sessionStorage.getSession();
  session.set(SESSION_ID, userId);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
};
