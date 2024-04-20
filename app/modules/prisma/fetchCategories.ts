import { prisma } from "~/lib/prisma";
import { Categories } from "~/types";
import { fetchChildrenCategories } from "./fetchChildrenCategories";

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
