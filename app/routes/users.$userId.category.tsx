import { ActionFunctionArgs, json } from '@remix-run/node';
import { addNewCategory } from '~/modules/prisma';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const newCategory = formData.get('newCategory');
  const parentCategory = formData.get('parentCategory');
  const now = new Date();

  const response = addNewCategory(
    'clv0qs04i00006d6c18akraw9',
    'clv1zv2o20005wio4uediw5hx',
    newCategory as string,
    now
  );

  return json({ response });
};
