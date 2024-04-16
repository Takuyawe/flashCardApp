import { prisma } from '~/lib/prisma';
import { createCategoryMap } from './createCategoryMap';

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

type AddNewCategory = (
  userId: string,
  parentCategoryId: string | null,
  name: string,
  now: Date
) => void;

export const addNewCategory: AddNewCategory = async (
  userId,
  parentCategoryId,
  name,
  now
) => {
  const response = await prisma.category.create({
    data: {
      userId: userId,
      parentCategoryId: parentCategoryId,
      name: name,
      createdAt: now,
      updatedAt: now,
    },
  });
  return response;
};

type FetchCategories = (userId: string) => void;

export const fetchCategories: FetchCategories = async (userId) => {
  const response = await prisma.category.findMany({
    where: {
      userId: userId,
      parentCategoryId: null,
    },
    include: {
      childCategories: {
        include: {
          childCategories: true,
        },
      },
    },
  });

  const categoryMap = createCategoryMap(response);

  return response;
};
