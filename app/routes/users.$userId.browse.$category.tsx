import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useRecoilState } from 'recoil';
import { categoriesAtom } from '~/atoms/atom';
import { CategoriesList } from '~/components/browse/CategoriesList';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const categoryId = url.searchParams.get('categoryId');

  return json({ categoryId });
};

export default function Category() {
  const [categories] = useRecoilState(categoriesAtom);

  return (
    <div className="flex-1">
      <CategoriesList categories={categories} />
    </div>
  );
}
