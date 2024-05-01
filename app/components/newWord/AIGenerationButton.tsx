import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { newWordFieldsAtom } from '~/atoms/atom';
import { generateWordLetterByLetter } from '~/modules/word/generateWordLetterByLetter';
import { action } from '~/routes/users.$userId.word.generate';

type Props = {
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AIGenerationButton = ({
  isGenerating,
  setIsGenerating,
}: Props) => {
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
    setIsGenerating(false);
  }, [fetcher.data, setNewWordFields, setIsGenerating]);

  return (
    <fetcher.Form
      action="generate"
      method="post"
      onSubmit={(e) => {
        if (newWordFields.word === '') {
          e.preventDefault();
          return;
        }
        setIsGenerating(true);
      }}>
      <input type="hidden" name="word" value={newWordFields.word} />
      <button
        type="submit"
        disabled={isGenerating}
        className="h-8 w-80 bg-base-dark text-white rounded-md text-sm">
        {isGenerating ? (
          <span className="flex items-center justify-center gap-x-2">
            <i className="ri-loader-2-line text-xl animate-spin" />
            Generating ...
          </span>
        ) : (
          'Generate Definition & Sentence'
        )}
      </button>
    </fetcher.Form>
  );
};
