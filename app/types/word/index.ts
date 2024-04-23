import { Category, Word } from '@prisma/client';

export interface CategoryWithChildren extends Category {
  childCategories?: CategoryWithChildren[];
}

export type Categories = CategoryWithChildren[];

export type WordsMap = Map<string, Word>;
