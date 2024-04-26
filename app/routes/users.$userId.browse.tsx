import { Outlet } from '@remix-run/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { categoriesAtom, wordsAtom } from '~/atoms/atom';
import { CategoryPath } from '~/components/browse/CategoryPath';
import { RecentlyAddedWordsContainer } from '~/components/browse/RecentlyAddedWordsContainer';
import { SearchBar } from '~/components/browse/SearchBar';
import { CategoryWithChildren } from '~/types/word';

export default function Layout() {
  const [words] = useRecoilState(wordsAtom);
  const [categories] = useRecoilState(categoriesAtom);
  const [chosenCategory, setChosenCategory] =
    useState<CategoryWithChildren | null>(null);

  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-4 my-6 overflow-auto">
      <SearchBar />
      <RecentlyAddedWordsContainer words={words} />
      <CategoryPath categories={categories} />
      <Outlet />
    </div>
  );
}
