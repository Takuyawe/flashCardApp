import { Category } from '@prisma/client';

export interface CategoryWithChildren extends Category {
  childCategories?: CategoryWithChildren[];
}

export type Categories = CategoryWithChildren[];
