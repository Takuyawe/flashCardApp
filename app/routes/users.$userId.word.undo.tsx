import { ActionFunctionArgs } from "@remix-run/node";
import { addNewWord, deleteWord } from "~/modules/prisma";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = formData.get("wordId");

  const response = await deleteWord(id as string);
  console.log(response);
  return null;
};
