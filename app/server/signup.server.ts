import { createUser, getUserData } from "../modules/prisma";
import {
  AUTH_UNEXPECTED_ERROR,
  DUPLICATE_EMAIL,
  EMPTY_INPUT_FOR_SIGNUP,
  PRISMA_UNEXPECTED_ERROR,
  SIGNUP_AUTHENTICATOR_STRATEGY_NAME,
  USER_NOT_FOUND,
} from "../constants/Authentication";
import { AuthResponse } from "../types";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "./session.server";
import { User } from "@prisma/client";
import { hashPassword } from "~/modules/hashPassword";
import { hash } from "bcrypt";

// export const signupAuthenticator = new Authenticator<AuthResponse>(
//   sessionStorage
// );

// signupAuthenticator.use(
//   new FormStrategy(async ({ form }) => {
//     const name = form.get("name") as string;
//     const email = form.get("email") as string;
//     const password = form.get("password") as string;
//     const response = await signup(name, email, password);
//     return response;
//   }),
//   SIGNUP_AUTHENTICATOR_STRATEGY_NAME
// );

type SignUp = (
  name: string,
  email: string,
  password: string
) => Promise<AuthResponse>;

export const signup: SignUp = async (name, email, password) => {
  if (!name || !email || !password)
    return { success: false, message: EMPTY_INPUT_FOR_SIGNUP };

  const hashedPassword = await hashPassword(password);

  try {
    const response = await createUser(name, email, hashedPassword, new Date());
    if (response.message === DUPLICATE_EMAIL) {
      return { success: false, message: DUPLICATE_EMAIL };
    } else if (response.message === PRISMA_UNEXPECTED_ERROR) {
      return { success: false, message: response.message };
    } else {
      return { success: true, data: response.data };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
  }

  return { success: false, message: AUTH_UNEXPECTED_ERROR };
};
