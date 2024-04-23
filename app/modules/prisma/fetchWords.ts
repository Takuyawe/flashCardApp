import { Word } from '@prisma/client';
import { prisma } from '~/lib/prisma';

type FetchWords = (categoryId: string) => Promise<Word[]>;

export const fetchWords: FetchWords = async (categoryId) => {
  const words: Word[] = await prisma.word.findMany({
    where: {
      categoryId,
    },
  });

  const wordsMap = new Map<string, Word>();
  words.forEach((word) => wordsMap.set(word.name, word));
  console.log(wordsMap);

  return words;
};
