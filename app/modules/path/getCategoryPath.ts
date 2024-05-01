import { getUserPath } from './getUserPath';

export const getCategoryPath = (userId: string, category: string) => {
  const userPath = getUserPath(userId);
  return `${userPath}/browse/${category}`;
};
