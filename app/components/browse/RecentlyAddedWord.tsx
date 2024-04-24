import { Word } from '@prisma/client';

type Props = {
  word: Word;
};

export const RecentlyAddedWord = ({ word }: Props) => {
  return (
    <button className="">
      <div className="flex gap-x-2">
        <i className="ri-file-list-line" />
        <span>{word.name}</span>
      </div>
    </button>
  );
};
