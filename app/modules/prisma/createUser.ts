import { User } from "@prisma/client";
import {
  DUPLICATE_EMAIL,
  PRISMA_UNEXPECTED_ERROR,
} from "~/constants/Authentication";
import { prisma } from "~/lib/prisma";

type CreateUser = (
  name: string,
  email: string,
  password: string,
  now: Date
) => Promise<User | { message: string }>;
export const createUser: CreateUser = async (name, email, password, now) => {
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userExists) {
      return { message: DUPLICATE_EMAIL };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  try {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
        createdAt: now,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  return { message: PRISMA_UNEXPECTED_ERROR };
};
