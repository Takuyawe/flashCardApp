import { useRecoilState } from 'recoil';
import { categoriesAtom } from '~/atoms/atom';
import { CategoriesList } from '~/components/browse/CategoriesList';

export default function Index() {
  const [categories] = useRecoilState(categoriesAtom);

  return (
    <div className="flex-1">
      <CategoriesList categories={categories} />
    </div>
  );
}
