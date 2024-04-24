import { useRecoilState } from 'recoil';
import { categoriesAtom, wordsAtom } from '~/atoms/atom';
import { CategoriesList } from '~/components/browse/CategoriesList';
import { CategoryPath } from '~/components/browse/CategoryPath';
import { RecentlyAddedWordsContainer } from '~/components/browse/RecentlyAddedWordsContainer';
import { SearchBar } from '~/components/browse/SearchBar';

export default function Index() {
  const [words] = useRecoilState(wordsAtom);
  const [categories] = useRecoilState(categoriesAtom);

  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-4 my-6">
      <SearchBar />
      <RecentlyAddedWordsContainer words={words} />
      <CategoryPath categoryPath={['Taku', 'child']} />
      <CategoriesList categories={categories} />
    </div>
  );
}
