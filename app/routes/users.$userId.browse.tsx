import { Outlet } from '@remix-run/react';
import { CategoryPath } from '~/components/browse/CategoryPath';
import { RecentlyAddedWordsContainer } from '~/components/browse/RecentlyAddedWordsContainer';
import { SearchBar } from '~/components/browse/SearchBar';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DND_PROVIDER_OPTIONS } from '~/constants/DndProvider';

export default function Layout() {
  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-4 my-6 pb-12">
      <SearchBar />
      <RecentlyAddedWordsContainer />
      <CategoryPath />
      <DndProvider backend={TouchBackend} options={DND_PROVIDER_OPTIONS}>
        <Outlet />
      </DndProvider>
    </div>
  );
}
