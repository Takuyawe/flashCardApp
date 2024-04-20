import { Category, User } from "@prisma/client";

export interface CategoryWithChildren extends Category {
  childCategories?: CategoryWithChildren[];
}

export type Categories = CategoryWithChildren[];

export type LoginResponse = {
  message?: string;
  user?: User;
};

export type PrismaCreateUserResponse = {
  message?: string;
  data?: User;
};

export type AuthResponse = {
  success: boolean;
  message?: string;
  data?: User;
};
