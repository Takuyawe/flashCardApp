export const CategorySelect = () => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-md" htmlFor="category">
        Category
      </label>
      <div className="flex w-80 justify-stretch gap-x-2">
        {/* TODO: customize options */}
        <select
          name="category"
          className="flex-1 border-2 border-base-dark rounded-md pl-2 text-lg">
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
          <option value="3">Category 3</option>
          <option value="4">Category 4</option>
          <option value="5">Category 5</option>
        </select>
        <button className="h-10 w-10 rounded-md border-2 border-base-dark">
          <i className="ri-add-line text-3xl" />
        </button>
      </div>
    </div>
  );
};
