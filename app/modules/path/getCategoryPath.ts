import { getUserPath } from './getUserPath';

export const getCategoryPath = (
  userId: string,
  category: string,
  categoryId: string
) => {
  const userPath = getUserPath(userId);
  return `${userPath}/browse/words/${category}?categoryId=${categoryId}`;
};
