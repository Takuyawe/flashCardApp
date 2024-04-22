import { User } from '@prisma/client';

export type PrismaCreateUserResponse = {
  message?: string;
  data?: User;
};
