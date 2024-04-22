import { signout } from '~/server/signout.server';

export const action = async () => {
  return await signout();
};
