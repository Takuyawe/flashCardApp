import { ActionFunctionArgs, json } from "@remix-run/node";
import { editCategoryName } from "~/modules/prisma";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const categoryId = formData.get("categoryId") as string;
  const newCategoryName = formData.get("newCategoryName") as string;

  const response = editCategoryName(categoryId, newCategoryName);

  return json({ response });
};
