import { destroyUserSession } from './session.server';

export const signout = async () => {
  return await destroyUserSession();
};
