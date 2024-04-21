import { getUserData } from "../modules/prisma";
import {
  LOGIN_AUTHENTICATOR_STRATEGY_NAME,
  EMPTY_INPUT_FOR_LOGIN,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from "../constants/Authentication";
import { AuthResponse, LoginResponse } from "../types";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "./session.server";
import { comparePasswords } from "~/modules/comparePasswords";

// export const loginAuthenticator = new Authenticator<LoginResponse>(
//   sessionStorage
// );

// loginAuthenticator.use(
//   new FormStrategy(async ({ form }) => {
//     const email = form.get("email") as string;
//     const password = form.get("password") as string;
//     const response = await login(email, password);
//     return response;
//   }),
//   LOGIN_AUTHENTICATOR_STRATEGY_NAME
// );

type Login = (email: string, password: string) => Promise<AuthResponse>;

export const login: Login = async (email, password) => {
  const user = await getUserData(email);

  if (!user) return { success: false, message: USER_NOT_FOUND };

  const isMatched = await comparePasswords(password, user.password);
  if (!isMatched) return { success: false, message: WRONG_PASSWORD };

  return { success: true, data: user };
};
