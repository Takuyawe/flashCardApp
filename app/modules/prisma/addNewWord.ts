import { prisma } from '~/lib/prisma';

type AddNewWord = (
  word: string,
  definition: string,
  categoryId: string,
  kana: string,
  romaji: string,
  part: string,
  exampleSentence: string,
  now: Date,
  exampleSentenceKana?: string,
  exampleSentenceRomaji?: string,
  exampleSentenceTranslation?: string
) => void;

export const addNewWord: AddNewWord = async (
  word,
  definition,
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
  const response = await prisma.word.create({
    data: {
      name: word,
      definition,
      categoryId,
      kana,
      romaji,
      part,
      exampleSentence,
      exampleSentenceKana: exampleSentenceKana ? exampleSentenceKana : '',
      exampleSentenceRomaji: exampleSentenceRomaji ? exampleSentenceRomaji : '',
      exampleSentenceTranslation: exampleSentenceTranslation
        ? exampleSentenceTranslation
        : '',
      createdAt: now,
      updatedAt: now,
    },
  });

  return response;
};
