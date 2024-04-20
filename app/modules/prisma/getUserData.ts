import { User } from "@prisma/client";
import { prisma } from "~/lib/prisma";

type GetUserData = (email: string) => Promise<User | null>;
export const getUserData: GetUserData = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
};
