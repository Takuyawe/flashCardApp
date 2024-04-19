import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session.server';
import { FormStrategy } from 'remix-auth-form';
import { login } from './login.server';
import { User } from '@prisma/client';
import { LoginResponse } from './types';

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
