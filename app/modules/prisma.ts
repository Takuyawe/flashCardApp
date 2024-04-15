import { prisma } from '~/lib/prisma';

type AddNewWord = (
  word: string,
  definition: string,
  categoryId: string,
  kana: string,
  romaji: string,
  part: string,
  exampleSentence: string,
  now: Date
) => void;

export const addNewWord: AddNewWord = async (
  word,
  definition,
  categoryId,
  kana,
  romaji,
  part,
  exampleSentence,
  now
) => {
  const response = await prisma.word.create({
    data: {
      name: word,
      definition: definition,
      categoryId: categoryId,
      kana: kana,
      romaji: romaji,
      part: part,
      exampleSentence: exampleSentence,
      createdAt: now,
      updatedAt: now,
    },
  });

  return response;
};
