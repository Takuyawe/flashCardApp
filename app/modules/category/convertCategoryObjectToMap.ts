import { Category } from '@prisma/client';
import { CategoriesMap } from '~/types/word';

export const convertCategoryObjectToMap = (
  words: Record<string, Category>
): CategoriesMap => {
  return new Map<string, Category>(
    Object.values(words).map((word) => [word.id, word] as [string, Category])
  );
};
