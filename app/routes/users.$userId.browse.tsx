import { useRecoilState } from 'recoil';
import { wordsAtom } from '~/atoms/atom';
import { RecentlyAddedWordsContainer } from '~/components/browse/RecentlyAddedWordsContainer';
import { SearchBar } from '~/components/browse/SearchBar';

export default function Index() {
  const [words] = useRecoilState(wordsAtom);

  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-4">
      <SearchBar />
      <RecentlyAddedWordsContainer words={words} />
    </div>
  );
}
