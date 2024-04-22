import {
  DUPLICATE_EMAIL,
  PRISMA_UNEXPECTED_ERROR,
} from '~/constants/Authentication';
import { prisma } from '~/lib/prisma';
import { PrismaCreateUserResponse } from '~/types/prisma';

type CreateUser = (
  name: string,
  email: string,
  password: string,
  now: Date
) => Promise<PrismaCreateUserResponse>;
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
    const data = await prisma.user.create({
      data: {
        name,
        email,
        password,
        createdAt: now,
      },
    });
    return { data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  return { message: PRISMA_UNEXPECTED_ERROR };
};
