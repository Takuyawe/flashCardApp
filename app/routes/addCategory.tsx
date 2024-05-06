import { ActionFunctionArgs, json } from "@remix-run/node";
import { addNewCategory } from "~/modules/prisma";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const newCategory = formData.get("newCategoryName");
  const parentCategoryId = formData.get("parentCategoryId");

  if (!userId || !newCategory || !parentCategoryId)
    throw new Error("Necessary fields not found");

  const now = new Date();

  const response = addNewCategory(
    userId as string,
    parentCategoryId !== "" ? (parentCategoryId as string) : null,
    newCategory as string,
    now
  );

  return json({ response });
};
