import { addNewCategory, createUser } from '../modules/prisma';
import {
  AUTH_UNEXPECTED_ERROR,
  DUPLICATE_EMAIL,
  EMPTY_INPUT_FOR_SIGNUP,
  PRISMA_UNEXPECTED_ERROR,
} from '../constants/Authentication';
import { AuthResponse } from '../types/auth';
import { hashPassword } from '~/modules/auth/hashPassword';

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
    const now = new Date();
    const { data, message } = await createUser(
      name,
      email,
      hashedPassword,
      now
    );
    if (message === DUPLICATE_EMAIL) {
      return { success: false, message: DUPLICATE_EMAIL };
    } else if (message === PRISMA_UNEXPECTED_ERROR) {
      return { success: false, message };
    }

    if (data) {
      await addNewCategory(data.id, null, data.name, now);
      return { success: true, data };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
  }

  return { success: false, message: AUTH_UNEXPECTED_ERROR };
};
