import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session.server';
import { FormStrategy } from 'remix-auth-form';
import { login } from './login.server';

export const authenticator = new Authenticator<number>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email') as string;
    const password = form.get('password') as string;
    console.log({ email, password });
    const userId = await login(email, password);
    console.log(userId);
    return userId;
  }),
  'user-login'
);
