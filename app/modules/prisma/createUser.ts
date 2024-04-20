import { User } from "@prisma/client";
import { prisma } from "~/lib/prisma";

type CreateUser = (
  name: string,
  email: string,
  password: string,
  now: Date
) => Promise<User>;
export const createUser: CreateUser = async (name, email, password, now) => {
  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      createdAt: now,
    },
  });
  return user;
};
