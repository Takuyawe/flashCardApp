import { prisma } from '~/lib/prisma';
import { Categories } from '~/types';

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

const fetchChildrenCategories = async (parentCategoryId: string) => {
  const childrenCategories: Categories = await prisma.category.findMany({
    where: {
      parentCategoryId: parentCategoryId,
    },
  });
  if (childrenCategories.length === 0) return [];
  for (const childCategory of childrenCategories) {
    childCategory.childCategories = await fetchChildrenCategories(
      childCategory.id
    );
  }

  return childrenCategories;
};

type FetchCategories = (userId: string) => Promise<Categories>;

export const fetchCategories: FetchCategories = async (userId: string) => {
  const categories: Categories = await prisma.category.findMany({
    where: {
      userId: userId,
      parentCategoryId: null,
    },
  });

  for (const category of categories) {
    category.childCategories = await fetchChildrenCategories(category.id);
  }

  return categories;
};
