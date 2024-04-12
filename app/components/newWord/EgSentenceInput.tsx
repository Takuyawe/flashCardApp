import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';

type Props = {
  word: string;
};

type FetcherDataType = {
  response: { content: [{ text: string }] };
};

export const EgSentenceInput = ({ word }: Props) => {
  const [sentence, setSentence] = useState<string>('');
  const fetcher = useFetcher();
  const generatedText = (fetcher.data as FetcherDataType)?.response.content[0]
    .text;

  useEffect(() => {
    if (!generatedText) return;
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < generatedText.length) {
        setSentence((prevState) => prevState + generatedText[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [generatedText]);

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
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        placeholder="Write an example sentence"
        className="h-40 w-80 border-2 border-base-dark rounded-md pl-2 pt-1 text-lg"
      />
    </div>
  );
};
