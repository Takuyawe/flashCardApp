import { getUserData } from '../modules/prisma';
import {
  AUTHENTICATOR_STRATEGY_NAME,
  EMPTY_INPUT_FOR_LOGIN,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from '../constants/Authentication';
import { AuthResponse } from '../types';
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { sessionStorage } from './session.server';

export const signupAuthenticator = new Authenticator<AuthResponse>(
  sessionStorage
);

signupAuthenticator.use(
  new FormStrategy(async ({ form }) => {
    const name = form.get('name') as string;
    const email = form.get('email') as string;
    const password = form.get('password') as string;
    const response = await signup(name, email, password);
    return response;
  }),
  AUTHENTICATOR_STRATEGY_NAME
);

type SignUp = (
  name: string,
  email: string,
  password: string
) => Promise<AuthResponse>;

export const signup: SignUp = async (name, email, password) => {
  const user = await getUserData(email);

  if (!email || !password) {
    return { message: EMPTY_INPUT_FOR_LOGIN };
  } else if (!user) {
    return { message: USER_NOT_FOUND };
  } else if (user?.password !== password) {
    return { message: WRONG_PASSWORD };
  } else {
    return { user };
  }
};
