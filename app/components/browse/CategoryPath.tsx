import { Link } from '@remix-run/react';
import { useRecoilState } from 'recoil';
import { userAtom } from '~/atoms/atom';
import { getCategoryPath } from '~/modules/path/getCategoryPath';
import { Categories } from '~/types/word';

type Props = {
  categories: Categories;
};

export const CategoryPath = ({ categories }: Props) => {
  const [user] = useRecoilState(userAtom);
  return (
    <div className="flex w-72">
      {categories.map((category, index) => (
        <div key={category.id} className="flex gap-x-1">
          <Link
            to={getCategoryPath(
              user?.id as string,
              category.name,
              category.id
            )}>
            <i className="ri-folder-fill text-gray-500 text-md" />
          </Link>
          <span className="text-base-dark">{category.name}</span>
          {index !== categories.length - 1 && (
            <i className="ri-arrow-right-s-line" />
          )}
        </div>
      ))}
    </div>
  );
};
