import { getUserPath } from './getUserPath';

export const getCategoryPath = (
  userId: string,
  category: string,
  categoryId: string
) => {
  const userPath = getUserPath(userId);
  return `${userPath}/browse/${category}?categoryId=${categoryId}`;
};
