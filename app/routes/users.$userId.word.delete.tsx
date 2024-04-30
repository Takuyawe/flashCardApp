import { ActionFunctionArgs } from "@remix-run/node";
import { typedjson } from "remix-typedjson";
import { deleteWord } from "~/modules/prisma";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = formData.get("wordId");

  const deletedWord = await deleteWord(id as string);

  return typedjson({ deletedWord });
};
