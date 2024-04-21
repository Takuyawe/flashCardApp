type Props = {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
};

// TODO: word is 10 characters max

export const WordInput = ({ word, setWord }: Props) => {
  return (
    <div className="grid place-items-center h-32 w-80 rounded-3xl border-2 border-base-dark shadow-sm">
      <input
        className="w-3/4 text-center outline-none text-3xl"
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word"
      />
    </div>
  );
};
