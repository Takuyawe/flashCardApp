import { useFetcher } from '@remix-run/react';

type Props = {
  word: string;
};

export const EgSentenceInput = ({ word }: Props) => {
  const fetcher = useFetcher();
  console.log(fetcher.data);
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex w-full justify-between">
        <label className="text-md" htmlFor="egSentence">
          Example Sentences (optional)
        </label>
        <fetcher.Form action="generate" method="post">
          <input type="hidden" name="word" value={word} />
          <button
            type="submit"
            className="bg-purple-600 text-white rounded-md h-7 w-8">
            <i className="ri-ai-generate text-xl font-bold" />
          </button>
        </fetcher.Form>
      </div>
      <textarea
        name="exampleSentence"
        placeholder="Write an example sentence"
        className="h-40 w-80 border-2 border-base-dark rounded-md pl-2 pt-1 text-lg"
      />
    </div>
  );
};
