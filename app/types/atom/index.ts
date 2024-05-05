import { User } from "@prisma/client";

export type UserAtom = Pick<User, "id" | "email" | "name">;

export type NewWordFieldsAtom = {
  word: string;
  kana: string;
  definition: string;
  sentence: string;
  sentenceKana: string;
  sentenceRomaji: string;
  sentenceTranslation: string;
  category: string;
  chosenCategoryId: string;
};
