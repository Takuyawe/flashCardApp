import { getUserPath } from './getUserPath';

export const getWordCategoryPath = (
  userId: string,
  category: string,
  categoryId: string
) => {
  const userPath = getUserPath(userId);
  return `${userPath}/browse/${category}/words?categoryId=${categoryId}`;
};
