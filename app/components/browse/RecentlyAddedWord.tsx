import { Word } from '@prisma/client';
import { Link } from '@remix-run/react';
import { useRecoilState } from 'recoil';
import { categoriesAtom, chosenCategoryIdAtom, userAtom } from '~/atoms/atom';
import { getCategoryName } from '~/modules/category/getCategoryName';
import { getWordCategoryPath } from '~/modules/path/getWordCategoryPath';

type Props = {
  word: Word;
};

export const RecentlyAddedWord = ({ word }: Props) => {
  const [user] = useRecoilState(userAtom);
  const [categories] = useRecoilState(categoriesAtom);
  const [, setChosenCategoryId] = useRecoilState(chosenCategoryIdAtom);

  return (
    <Link
      to={getWordCategoryPath(
        user?.id as string,
        getCategoryName(categories, word.categoryId),
        word.categoryId,
        word.id
      )}
      onClick={() => setChosenCategoryId(word.categoryId)}
      className="">
      <div className="flex gap-x-2">
        <i className="ri-file-list-line" />
        <span>{word.name}</span>
      </div>
    </Link>
  );
};
