import { getUserPath } from './getUserPath';

export const getMenuPath = (userId: string, menuPath: string) => {
  const userPath = getUserPath(userId);
  return `${userPath}/${menuPath}`;
};
