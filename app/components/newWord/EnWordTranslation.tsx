import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { newWordFieldsAtom } from '~/atoms/atom';
import { generateWordLetterByLetter } from '~/modules/word/generateWordLetterByLetter';
import { action } from '~/routes/users.$userId.word.translate';

export const EnWordTranslation = () => {
  const [, setNewWordFields] = useRecoilState(newWordFieldsAtom);
  const fetcher = useFetcher<typeof action>();
  const [word, setWord] = useState<string>('');

  useEffect(() => {
    if (!fetcher.data || 'error' in fetcher.data) return;

    setNewWordFields((prevState) => ({
      ...prevState,
      word: '',
    }));

    const { text } = fetcher.data;

    generateWordLetterByLetter(text, 'word', setNewWordFields);
  }, [fetcher.data, setNewWordFields]);

  return (
    <fetcher.Form
      method="post"
      action="translate"
      onSubmit={(e) => {
        if (word === '') {
          e.preventDefault();
          return;
        }
      }}>
      <div className="flex gap-x-2 w-80">
        <input
          name="word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Write an English word for translation"
          className="h-8 flex-1 border-2 border-base-dark rounded-md pl-2 pt-1 text-sm"
        />
        <button
          type="submit"
          className="grid place-content-center h-8 w-8 rounded-md border-2 border-base-dark">
          <i className="ri-translate-2 text-xl" />
        </button>
      </div>
    </fetcher.Form>
  );
};
