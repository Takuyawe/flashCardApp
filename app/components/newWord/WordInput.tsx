// TODO: word is 10 characters max

import { useRecoilState } from "recoil";
import { newWordFieldsAtom } from "~/atoms/atom";

export const WordInput = () => {
  const [newWordFields, setNewWordFields] = useRecoilState(newWordFieldsAtom);

  return (
    <div className="relative grid place-items-center h-28 w-80 rounded-3xl border-2 border-base-dark shadow-sm">
      <span className="absolute top-2 text-sm">{newWordFields.kana}</span>
      <input
        className="w-3/4 text-center outline-none text-2xl"
        type="text"
        value={newWordFields.word}
        onChange={(e) =>
          setNewWordFields({ ...newWordFields, word: e.target.value })
        }
        placeholder="Enter a word"
      />
    </div>
  );
};
