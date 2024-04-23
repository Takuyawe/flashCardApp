import { useRecoilState } from 'recoil';
import { wordsAtom } from '~/atoms/atom';
import { RecentlyAddedWords } from '~/components/browse/RecentlyAddedWords';
import { SearchBar } from '~/components/browse/SearchBar';

export default function Index() {
  const [words] = useRecoilState(wordsAtom);

  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-4">
      <SearchBar />
      <RecentlyAddedWords words={words} />
    </div>
  );
}
