export const EgSentenceInput = () => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-md" htmlFor="egSentence">
        Example Sentences (optional)
      </label>
      <textarea
        name="exampleSentence"
        placeholder="Write an example sentence"
        className="h-40 w-80 border-2 border-base-dark rounded-md pl-2 pt-1 text-lg"
      />
    </div>
  );
};
