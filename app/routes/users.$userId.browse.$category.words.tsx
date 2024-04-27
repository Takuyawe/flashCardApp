import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { wordsAtom } from '~/atoms/atom';
import { WordCard } from '~/components/browse/WordCard';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const categoryId = url.searchParams.get('categoryId');

  return json({ categoryId });
};

export default function Category() {
  const { categoryId } = useLoaderData<typeof loader>();
  const [words] = useRecoilState(wordsAtom);

  const wordsByCategory = useMemo(() => {
    return Array.from(words.values()).filter(
      (word) => word.categoryId === categoryId
    );
  }, [categoryId, words]);

  return (
    <div className="flex-1 flex flex-col gap-y-3">
      {wordsByCategory.map((word) => (
        <WordCard key={word.id} word={word} />
      ))}
    </div>
  );
}
