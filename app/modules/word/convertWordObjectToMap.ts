import { Word } from '@prisma/client';
import { WordsMap } from '~/types/word';

export const convertWordObjectToMap = (
  words: Record<string, Word>
): WordsMap => {
  return new Map<string, Word>(
    Object.values(words).map((word) => [word.id, word] as [string, Word])
  );
};
