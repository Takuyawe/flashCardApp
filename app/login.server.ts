import { getUserData } from './modules/prisma';
import {
  EMPTY_INPUT,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from './constants/LoginResponse';
import { LoginResponse } from './types';

type Login = (email: string, password: string) => Promise<LoginResponse>;

export const login: Login = async (email, password) => {
  const user = await getUserData(email);

  console.log('user', user);

  if (!email || !password) {
    return { message: EMPTY_INPUT };
  } else if (!user) {
    return { message: USER_NOT_FOUND };
  } else if (user?.password !== password) {
    return { message: WRONG_PASSWORD };
  } else {
    return { user };
  }
};
