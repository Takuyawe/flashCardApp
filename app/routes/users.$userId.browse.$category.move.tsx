import { ActionFunctionArgs } from '@remix-run/node';
import { moveCategory } from '~/modules/prisma';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const currentCategoryId = formData.get('currentCategoryId') as string;
  const targetCategoryId = formData.get('targetCategoryId') as string;

  const response = await moveCategory(currentCategoryId, targetCategoryId);

  console.log(response);

  return response;
};
