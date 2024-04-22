import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { action } from '~/routes/users.$userId.word.generate';

type Props = {
  word: string;
  setDefinition: React.Dispatch<React.SetStateAction<string>>;
  setSentence: React.Dispatch<React.SetStateAction<string>>;
  setSentenceKana: React.Dispatch<React.SetStateAction<string>>;
  setSentenceRomaji: React.Dispatch<React.SetStateAction<string>>;
  setSentenceTranslation: React.Dispatch<React.SetStateAction<string>>;
};

export const AIGenerationButton = ({
  word,
  setDefinition,
  setSentence,
  setSentenceKana,
  setSentenceRomaji,
  setSentenceTranslation,
}: Props) => {
  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    if (!fetcher.data || 'error' in fetcher.data) return;

    setDefinition(() => '');
    setSentence(() => '');
    setSentenceKana(() => '');
    setSentenceRomaji(() => '');
    setSentenceTranslation(() => '');

    const {
      definitionText,
      sentence,
      sentenceKana,
      sentenceRomaji,
      sentenceTranslation,
    } = fetcher.data;

    const intervalId = setInterval(() => {
      setDefinition((prevState) => {
        if (prevState.length < definitionText.length)
          return prevState + definitionText[prevState.length];
        return prevState;
      });
      setSentence((prevState) => {
        if (prevState.length < sentence.length)
          return prevState + sentence[prevState.length];
        return prevState;
      });
      setSentenceKana((prevState) => {
        console.log(prevState);
        if (prevState.length < sentenceKana.length)
          return prevState + sentenceKana[prevState.length];
        return prevState;
      });
      setSentenceRomaji((prevState) => {
        if (prevState.length < sentenceRomaji.length)
          return prevState + sentenceRomaji[prevState.length];
        return prevState;
      });
      setSentenceTranslation((prevState) => {
        if (prevState.length < sentenceTranslation.length)
          return prevState + sentenceTranslation[prevState.length];
        return prevState;
      });
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <fetcher.Form action="generate" method="post">
      <input type="hidden" name="word" value={word} />
      <button className="h-10 w-80 bg-base-dark text-white rounded-md text-md">
        Generate Definition & Sentence
      </button>
    </fetcher.Form>
  );
};
