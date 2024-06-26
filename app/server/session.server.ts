import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { COOKIE_SESSION_NAME, SESSION_ID } from '../constants/Authentication';

const sessionSecret: string | undefined = process.env.SESSION_SECRET;
if (sessionSecret === undefined) throw new Error('SESSION_SECRET must be set');

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: COOKIE_SESSION_NAME,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
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

export const destroyUserSession = async () => {
  const session = await sessionStorage.getSession();
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
};
