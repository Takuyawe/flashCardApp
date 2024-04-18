import { ActionFunctionArgs, json } from '@remix-run/node';
import { addNewCategory } from '~/modules/prisma';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const newCategory = formData.get('newCategory');
  const parentCategoryId = formData.get('parentCategoryId');
  const now = new Date();

  const response = addNewCategory(
    'clv0qs04i00006d6c18akraw9',
    parentCategoryId as string,
    newCategory as string,
    now
  );

  return json({ response });
};
