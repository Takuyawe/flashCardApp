import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { generateWordLetterByLetter } from '~/modules/word/generateWordLetterByLetter';
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

    generateWordLetterByLetter(definitionText, setDefinition);
    generateWordLetterByLetter(sentence, setSentence);
    generateWordLetterByLetter(sentenceKana, setSentenceKana);
    generateWordLetterByLetter(sentenceRomaji, setSentenceRomaji);
    generateWordLetterByLetter(sentenceTranslation, setSentenceTranslation);
  }, [fetcher.data]);

  return (
    <fetcher.Form action="generate" method="post">
      <input type="hidden" name="word" value={word} />
      <button className="h-10 w-80 bg-base-dark text-white rounded-md text-md">
        Generate Definition & Sentence
      </button>
    </fetcher.Form>
  );
};
