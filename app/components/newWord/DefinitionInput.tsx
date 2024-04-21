type Props = {
  definition: string;
  setDefinition: React.Dispatch<React.SetStateAction<string>>;
};

export const DefinitionInput = ({ definition, setDefinition }: Props) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-sm" htmlFor="definition">
        Definition
      </label>
      <input
        name="definition"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
        placeholder="Write a definition"
        className="h-10 w-80 border-2 border-base-dark rounded-md pl-2 text-md"
      />
    </div>
  );
};
