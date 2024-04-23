import { Word } from '@prisma/client';
import { prisma } from '~/lib/prisma';
import { WordsMap } from '~/types/word';

type FetchWords = (categoryId: string) => Promise<WordsMap>;

export const fetchWords: FetchWords = async (userId) => {
  const words: Word[] = await prisma.word.findMany({
    where: {
      userId,
    },
  });

  const wordsMap = new Map<string, Word>();
  words.forEach((word) => wordsMap.set(word.id, word));

  return wordsMap;
};
