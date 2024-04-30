import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { newWordFieldsAtom } from '~/atoms/atom';
import { generateWordLetterByLetter } from '~/modules/word/generateWordLetterByLetter';
import { action } from '~/routes/users.$userId.word.generate';

export const AIGenerationButton = () => {
  const [newWordFields, setNewWordFields] = useRecoilState(newWordFieldsAtom);
  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    if (!fetcher.data || 'error' in fetcher.data) return;

    setNewWordFields((prevState) => ({
      ...prevState,
      definition: '',
      sentence: '',
      sentenceKana: '',
      sentenceRomaji: '',
      sentenceTranslation: '',
    }));

    const {
      definitionText,
      sentence,
      sentenceKana,
      sentenceRomaji,
      sentenceTranslation,
    } = fetcher.data;

    generateWordLetterByLetter(definitionText, 'definition', setNewWordFields);
    generateWordLetterByLetter(sentence, 'sentence', setNewWordFields);
    generateWordLetterByLetter(sentenceKana, 'sentenceKana', setNewWordFields);
    generateWordLetterByLetter(
      sentenceRomaji,
      'sentenceRomaji',
      setNewWordFields
    );
    generateWordLetterByLetter(
      sentenceTranslation,
      'sentenceTranslation',
      setNewWordFields
    );
  }, [fetcher.data, setNewWordFields]);

  return (
    <fetcher.Form action="generate" method="post">
      <input type="hidden" name="word" value={newWordFields.word} />
      <button className="h-8 w-80 bg-base-dark text-white rounded-md text-sm">
        Generate Definition & Sentence
      </button>
    </fetcher.Form>
  );
};
