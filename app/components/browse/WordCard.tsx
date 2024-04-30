import { Word } from '@prisma/client';
import { useFetcher } from '@remix-run/react';
import { speakWord } from '~/modules/browse/speakWord';

type Props = {
  word: Word;
};

export const WordCard = ({ word }: Props) => {
  const fetcher = useFetcher();

  return (
    <div className="min-h-32 h-auto w-72 rounded-lg border border-base-dark px-2 py-2">
      <div className="flex items-center justify-start gap-x-1">
        <button onClick={() => speakWord(word.name)}>
          <i className="ri-speak-fill text-lg" />
        </button>
        <span className="text-sm">
          {word.name} / ({word.kana}) /{' '}
          {word.definition.replaceAll('.', '').replaceAll(`"`, '')}
        </span>
        <fetcher.Form method="delete" action="delete" className="ml-auto">
          <input type="hidden" name="wordId" value={word.id} />
          <button type="submit">
            <i className="ri-delete-bin-line text-lg" />
          </button>
        </fetcher.Form>
      </div>
      <div className="flex flex-col">
        <span className="text-xs">Example sentence</span>
        <div className="w-1/2 border-t border-base-dark " />
        <div className="flex flex-col gap-y-1">
          <span className="text-xs">{word.exampleSentence}</span>
          <span className="text-xs">{word.exampleSentenceKana}</span>
          <span className="text-xs">{word.exampleSentenceRomaji}</span>
          <span className="text-xs">{word.exampleSentenceTranslation}</span>
        </div>
      </div>
    </div>
  );
};
