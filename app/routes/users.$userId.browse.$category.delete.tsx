import { ActionFunctionArgs } from "@remix-run/node";
import { typedjson } from "remix-typedjson";
import { deleteCategory } from "~/modules/prisma";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = formData.get("categoryId");

  if (!id) throw new Error("Category ID not found");

  const deletedCategory = await deleteCategory(id as string);

  return typedjson({ deletedCategory });
};
