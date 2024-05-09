import { getUserPath } from './getUserPath';

export const getQuizResultPath = (userId: string) => {
  const userPath = getUserPath(userId);
  return `${userPath}/quiz/result`;
};
