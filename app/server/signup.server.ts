import { createUser, getUserData } from "../modules/prisma";
import {
  DUPLICATE_EMAIL,
  EMPTY_INPUT_FOR_SIGNUP,
  SIGNUP_AUTHENTICATOR_STRATEGY_NAME,
  USER_NOT_FOUND,
} from "../constants/Authentication";
import { AuthResponse } from "../types";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "./session.server";

export const signupAuthenticator = new Authenticator<AuthResponse>(
  sessionStorage
);

signupAuthenticator.use(
  new FormStrategy(async ({ form }) => {
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const response = await signup(name, email, password);
    return response;
  }),
  SIGNUP_AUTHENTICATOR_STRATEGY_NAME
);

type SignUp = (
  name: string,
  email: string,
  password: string
) => Promise<AuthResponse>;

export const signup: SignUp = async (name, email, password) => {
  // TODO: Change for sign up method
  const user = await getUserData(email);

  if (user) return { message: DUPLICATE_EMAIL };

  const response = await createUser(name, email, password, new Date());

  if (!name || !email || !password) {
    return { message: EMPTY_INPUT_FOR_SIGNUP };
  } else if (!user) {
    return { message: USER_NOT_FOUND };
  } else {
    return { user };
  }
};
