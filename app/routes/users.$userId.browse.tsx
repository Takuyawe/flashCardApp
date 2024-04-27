import { Outlet } from "@remix-run/react";
import { CategoryPath } from "~/components/browse/CategoryPath";
import { RecentlyAddedWordsContainer } from "~/components/browse/RecentlyAddedWordsContainer";
import { SearchBar } from "~/components/browse/SearchBar";

export default function Layout() {
  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-4 my-6 overflow-auto">
      <SearchBar />
      <RecentlyAddedWordsContainer />
      <CategoryPath />
      <Outlet />
    </div>
  );
}
