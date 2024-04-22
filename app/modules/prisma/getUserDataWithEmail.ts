import { User } from '@prisma/client';
import { prisma } from '~/lib/prisma';

type GetUserDataWithEmail = (email: string) => Promise<User | null>;
export const getUserDataWithEmail: GetUserDataWithEmail = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
};
