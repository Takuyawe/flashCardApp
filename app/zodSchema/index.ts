import { z } from "zod";
import {
  EMAIL_REQUIRED_ERROR,
  NAME_REQUIRED_ERROR,
  PASSWORD_REQUIRED_ERROR,
  PASSWORD_TOO_SHORT,
} from "~/constants/Authentication";

export const signupSchema = z.object({
  name: z.string({ required_error: NAME_REQUIRED_ERROR }),
  email: z.string({ required_error: EMAIL_REQUIRED_ERROR }).email(),
  password: z
    .string({ required_error: PASSWORD_REQUIRED_ERROR })
    .min(8, PASSWORD_TOO_SHORT),
});

export const loginSchema = z.object({
  email: z.string({ required_error: EMAIL_REQUIRED_ERROR }).email(),
  password: z
    .string({ required_error: PASSWORD_REQUIRED_ERROR })
    .min(8, PASSWORD_TOO_SHORT),
});
