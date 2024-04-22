type Props = {
  sentence: string;
  setSentence: React.Dispatch<React.SetStateAction<string>>;
  sentenceKana: string;
  sentenceRomaji: string;
  sentenceTranslation: string;
};

export const EgSentenceInput = ({
  sentence,
  setSentence,
  sentenceKana,
  sentenceRomaji,
  sentenceTranslation,
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-y-1">
      <div className="flex w-full justify-between">
        <label className="text-sm" htmlFor="egSentence">
          Example Sentences
        </label>
      </div>
      <textarea
        name="exampleSentence"
        value={`${sentence}\n${sentenceKana}\n${sentenceRomaji}\n${sentenceTranslation}`}
        onChange={(e) => setSentence(e.target.value)}
        placeholder="Write an example sentence"
        className="h-36 w-80 border-2 border-base-dark rounded-md pl-2 pt-1 text-md"
      />
    </div>
  );
};
