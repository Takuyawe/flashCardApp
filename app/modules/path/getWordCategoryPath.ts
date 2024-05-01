import { getUserPath } from './getUserPath';

export const getWordCategoryPath = (
  userId: string,
  category: string,
  categoryId: string,
  wordId?: string
) => {
  const userPath = getUserPath(userId);
  return `${userPath}/browse/${category}/words?categoryId=${categoryId}&wordId=${wordId}`;
};
