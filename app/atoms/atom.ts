import { atom } from 'recoil';
import { USER_ATOM_KEY } from '~/constants/Atom';
import { UserAtom } from '~/types/atom';

export const userAtom = atom<UserAtom | null>({
  key: USER_ATOM_KEY,
  default: null,
});
