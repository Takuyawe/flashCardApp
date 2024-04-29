import { Category, Word } from "@prisma/client";
import { atom } from "recoil";
import {
  CATEGORIES_ATOM_KEY,
  CHOSEN_CATEGORY_ID_ATOM_KEY,
  NEW_WORD_FIELDS_KEY,
  USER_ATOM_KEY,
  WORDS_ATOM_KEY,
} from "~/constants/Atom";
import { NewWordFieldsAtom, UserAtom } from "~/types/atom";
import { Categories, CategoriesMap, WordsMap } from "~/types/word";

export const userAtom = atom<UserAtom | null>({
  key: USER_ATOM_KEY,
  default: null,
});

export const categoriesAtom = atom<CategoriesMap>({
  key: CATEGORIES_ATOM_KEY,
  default: new Map<string, Category>(),
});

export const chosenCategoryIdAtom = atom<string>({
  key: CHOSEN_CATEGORY_ID_ATOM_KEY,
  default: "",
});

export const wordsAtom = atom<WordsMap>({
  key: WORDS_ATOM_KEY,
  default: new Map<string, Word>(),
});

export const newWordFieldsAtom = atom<NewWordFieldsAtom>({
  key: NEW_WORD_FIELDS_KEY,
  default: {
    word: "",
    definition: "",
    sentence: "",
    sentenceKana: "",
    sentenceRomaji: "",
    sentenceTranslation: "",
    category: "",
    chosenCategoryId: "",
  },
});
