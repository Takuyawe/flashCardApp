import { User } from '@prisma/client';
import { prisma } from '~/lib/prisma';

type GetUserDataWithId = (id: string) => Promise<User | null>;
export const getUserDataWithId: GetUserDataWithId = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
