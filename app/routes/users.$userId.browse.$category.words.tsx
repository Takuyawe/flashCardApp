import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { wordsAtom } from '~/atoms/atom';
import { WordCard } from '~/components/browse/WordCard';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const categoryId = url.searchParams.get('categoryId');
  const wordId = url.searchParams.get('wordId');

  return json({ categoryId, wordId });
};

export default function Category() {
  const { categoryId, wordId } = useLoaderData<typeof loader>();
  const [words] = useRecoilState(wordsAtom);

  const wordsByCategory = useMemo(() => {
    const filteredWords = Array.from(words.values()).filter(
      (word) => word.categoryId === categoryId
    );
    if (wordId) {
      const index = filteredWords.findIndex((word) => word.id === wordId);
      if (index > -1) {
        const [selectedWord] = filteredWords.splice(index, 1);
        filteredWords.unshift(selectedWord);
      }
    }
    return filteredWords;
  }, [categoryId, words, wordId]);

  return (
    <div className="flex-1 flex flex-col gap-y-3 overflow-auto">
      {wordsByCategory.map((word) => (
        <WordCard key={word.id} word={word} />
      ))}
    </div>
  );
}
