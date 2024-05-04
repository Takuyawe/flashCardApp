import { useFetcher } from "@remix-run/react";
import { motion } from "framer-motion";
import { generate } from "random-words";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { newWordFieldsAtom } from "~/atoms/atom";
import { generateWordLetterByLetter } from "~/modules/word/generateWordLetterByLetter";
import { action } from "~/routes/users.$userId.word.translate";

export const WordOfToday = () => {
  const [, setNewWordFields] = useRecoilState(newWordFieldsAtom);
  const fetcher = useFetcher<typeof action>();
  const [word, setWord] = useState<string>();

  useEffect(() => {
    if (!fetcher.data || "error" in fetcher.data) return;
    setNewWordFields((prevState) => ({
      ...prevState,
      word: "",
      kana: "",
    }));

    const { text, kana } = fetcher.data;

    generateWordLetterByLetter(text, "word", setNewWordFields);
    generateWordLetterByLetter(kana, "kana", setNewWordFields);
  }, [fetcher.data, setNewWordFields]);

  return (
    <fetcher.Form method="post" action="translate">
      <input type="hidden" name="word" value={word} />
      <motion.button
        type="submit"
        onClick={() => {
          const word = generate({ maxLength: 10 }) as string;
          setWord(word);
        }}
        whileTap={{ y: 2 }}
        className="bg-gradient-to-r from-base-dark via-light-dark to-base-dark text-white px-2 py-1 rounded-lg"
      >
        Word of Today
      </motion.button>
    </fetcher.Form>
  );
};
