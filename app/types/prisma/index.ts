import { User } from '@prisma/client';
import { CategoryWithChildren } from '../word';

export type PrismaCreateUserResponse = {
  message?: string;
  data?: User;
};

export type PrismaMoveCategoryResponse = {
  message?: string;
  data?: CategoryWithChildren;
};
