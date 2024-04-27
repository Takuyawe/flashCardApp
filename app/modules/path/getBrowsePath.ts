import { getUserPath } from "./getUserPath";

export const getBrowsePath = (userId: string) => {
  const userPath = getUserPath(userId);
  return `${userPath}/browse`;
};
