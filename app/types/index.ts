import { Prisma } from '@prisma/client';

export type CategoryWithChildren = Prisma.CategoryGetPayload<{
  include: {
    childCategories: true;
  };
}>;

export type Categories = CategoryWithChildren[];
