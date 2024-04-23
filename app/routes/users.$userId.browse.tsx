import { RecentlyAddedButton } from '~/components/browse/RecentlyAddedButton';
import { SearchBar } from '~/components/browse/SearchBar';

export default function Index() {
  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-4">
      <SearchBar />
      <RecentlyAddedButton />
    </div>
  );
}
