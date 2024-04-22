import { User } from '@prisma/client';
import { atom } from 'recoil';
import { USER_ATOM_KEY } from '~/constants/Atom';

export const userAtom = atom<User | null>({
  key: USER_ATOM_KEY,
  default: null,
});
