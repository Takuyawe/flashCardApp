export const DefinitionInput = () => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-md" htmlFor="definition">
        Definition
      </label>
      <input
        name="definition"
        placeholder="Write a definition"
        className="h-10 w-80 border-2 border-base-dark rounded-md pl-2 text-lg"
      />
    </div>
  );
};
