import { Word } from "@prisma/client";
import { prisma } from "~/lib/prisma";

type AddNewWord = (
  word: string,
  definition: string,
  userId: string,
  categoryId: string,
  kana: string,
  romaji: string,
  part: string,
  exampleSentence: string,
  now: Date,
  exampleSentenceKana?: string,
  exampleSentenceRomaji?: string,
  exampleSentenceTranslation?: string
) => Promise<Word>;

export const addNewWord: AddNewWord = async (
  word,
  definition,
  userId,
  categoryId,
  kana,
  romaji,
  part,
  exampleSentence,
  now,
  exampleSentenceKana?,
  exampleSentenceRomaji?,
  exampleSentenceTranslation?
) => {
  return await prisma.word.create({
    data: {
      name: word,
      definition,
      userId,
      categoryId,
      kana,
      romaji,
      part,
      exampleSentence,
      exampleSentenceKana: exampleSentenceKana ? exampleSentenceKana : "",
      exampleSentenceRomaji: exampleSentenceRomaji ? exampleSentenceRomaji : "",
      exampleSentenceTranslation: exampleSentenceTranslation
        ? exampleSentenceTranslation
        : "",
      createdAt: now,
      updatedAt: now,
    },
  });
};
