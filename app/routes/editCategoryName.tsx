import { ActionFunctionArgs, json } from "@remix-run/node";
import { editCategoryName } from "~/modules/prisma";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const categoryId = formData.get("categoryId");
  const newCategoryName = formData.get("newCategoryName");

  if (!categoryId || !newCategoryName)
    throw new Error("Necessary fields not found");

  const response = editCategoryName(
    categoryId as string,
    newCategoryName as string
  );

  return json({ response });
};
