export const SearchBar = () => {
  return (
    <div className="relative">
      <i className="ri-search-line text-xl absolute left-2 top-1 opacity-75" />
      <input
        name="search"
        placeholder="Search a word"
        className="h-9 w-72 border-2 border-base-dark rounded-md pl-8 text-md"
      />
    </div>
  );
};
