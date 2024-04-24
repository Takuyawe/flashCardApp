import { Outlet } from '@remix-run/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { wordsAtom } from '~/atoms/atom';
import { CategoryPath } from '~/components/browse/CategoryPath';
import { RecentlyAddedWordsContainer } from '~/components/browse/RecentlyAddedWordsContainer';
import { SearchBar } from '~/components/browse/SearchBar';
import { CategoryWithChildren } from '~/types/word';

export default function Layout() {
  const [words] = useRecoilState(wordsAtom);
  const [chosenCategory, setChosenCategory] =
    useState<CategoryWithChildren | null>(null);

  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-4 my-6">
      <SearchBar />
      <RecentlyAddedWordsContainer words={words} />
      <CategoryPath categoryPath={['Taku', 'child']} />
      <Outlet />
    </div>
  );
}
