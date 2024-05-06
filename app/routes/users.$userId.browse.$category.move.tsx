import { ActionFunctionArgs } from "@remix-run/node";
import { moveCategory } from "~/modules/prisma";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const currentCategoryId = formData.get("currentCategoryId");
  const targetCategoryId = formData.get("targetCategoryId");

  if (!currentCategoryId || !targetCategoryId)
    throw new Error("Category ID not found");

  const response = await moveCategory(
    currentCategoryId as string,
    targetCategoryId as string
  );

  console.log(response);

  return response;
};
