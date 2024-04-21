import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

type FetcherDataType = {
  definitionResponse: { content: [{ text: string }] };
  sentenceResponse: { content: [{ text: string }] };
};

type Props = {
  word: string;
  setDefinition: React.Dispatch<React.SetStateAction<string>>;
  setSentence: React.Dispatch<React.SetStateAction<string>>;
};

export const AIGenerationButton = ({
  word,
  setDefinition,
  setSentence,
}: Props) => {
  const fetcher = useFetcher();
  const generatedDefinitionAndSentence = [
    (fetcher.data as FetcherDataType)?.definitionResponse.content[0].text,
    (fetcher.data as FetcherDataType)?.sentenceResponse.content[0].text,
  ];

  useEffect(() => {
    if (
      !generatedDefinitionAndSentence[0] ||
      !generatedDefinitionAndSentence[1]
    )
      return;

    setSentence(() => "");
    setDefinition(() => "");

    const intervalId = setInterval(() => {
      setDefinition((prevState) => {
        if (prevState.length < generatedDefinitionAndSentence[0].length)
          return (
            prevState + generatedDefinitionAndSentence[0][prevState.length]
          );
        return prevState;
      });
      setSentence((prevState) => {
        if (prevState.length < generatedDefinitionAndSentence[1].length)
          return (
            prevState + generatedDefinitionAndSentence[1][prevState.length]
          );
        return prevState;
      });
    }, 50);

    return () => clearInterval(intervalId);
  }, [generatedDefinitionAndSentence[0]]);

  return (
    <fetcher.Form action="generate" method="post">
      <input type="hidden" name="word" value={word} />
      <button className="h-10 w-80 bg-base-dark text-white rounded-md text-md">
        Generate Definition & Sentence
      </button>
    </fetcher.Form>
  );
};
