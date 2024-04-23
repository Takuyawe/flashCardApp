import { ActionFunctionArgs, json } from '@remix-run/node';
import { addNewCategory } from '~/modules/prisma';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const userId = formData.get('userId');
  const newCategory = formData.get('newCategory');
  const parentCategoryId = formData.get('parentCategoryId');
  const now = new Date();

  const response = addNewCategory(
    userId as string,
    parentCategoryId !== '' ? (parentCategoryId as string) : null,
    newCategory as string,
    now
  );

  return json({ response });
};
