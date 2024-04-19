import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session.server';
import { FormStrategy } from 'remix-auth-form';
import { login } from './login.server';
import { User } from '@prisma/client';
import { LoginResponse } from './types';
import { redirect } from '@remix-run/node';

export const authenticator = new Authenticator<LoginResponse>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email') as string;
    const password = form.get('password') as string;
    const response = await login(email, password);
    return response;
  }),
  'user-login'
);

export const requireUserSession = async (request: Request) => {
  const userId = await getUserFromSession(request);
  return userId;
};

export const getUserFromSession = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );
  const userId: string = session.get('userId');
  if (!userId) return null;
  return userId;
};
