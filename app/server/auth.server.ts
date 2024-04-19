import { sessionStorage } from './session.server';
import { SESSION_ID } from '../constants/Authentication';

export const requireUserSession = async (request: Request) => {
  const userId = await getUserFromSession(request);
  return userId;
};

export const getUserFromSession = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );
  const userId: string = session.get(SESSION_ID);
  if (!userId) return null;
  return userId;
};
