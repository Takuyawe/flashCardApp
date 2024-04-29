import { z } from "zod";
import {
  EMAIL_REQUIRED_ERROR,
  NAME_REQUIRED_ERROR,
  PASSWORD_REQUIRED_ERROR,
  PASSWORD_TOO_SHORT,
} from "~/constants/Authentication";

const emailSchema = z.string({ required_error: EMAIL_REQUIRED_ERROR }).email();

const passWordSchema = z
  .string({ required_error: PASSWORD_REQUIRED_ERROR })
  .min(8, PASSWORD_TOO_SHORT);

export const signupSchema = z.object({
  name: z.string({ required_error: NAME_REQUIRED_ERROR }),
  email: emailSchema,
  password: passWordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passWordSchema,
});
