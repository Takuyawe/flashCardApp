import { atom } from 'recoil';
import { CATEGORIES_ATOM_KEY, USER_ATOM_KEY } from '~/constants/Atom';
import { UserAtom } from '~/types/atom';
import { Categories } from '~/types/word';

export const userAtom = atom<UserAtom | null>({
  key: USER_ATOM_KEY,
  default: null,
});

export const categoriesAtom = atom<Categories>({
  key: CATEGORIES_ATOM_KEY,
  default: [],
});
