import { Word } from "@prisma/client";
import { prisma } from "~/lib/prisma";

type DeleteWord = (wordId: string) => Promise<Word>;

export const deleteWord: DeleteWord = async (wordId) => {
  return await prisma.word.delete({ where: { id: wordId } });
};
