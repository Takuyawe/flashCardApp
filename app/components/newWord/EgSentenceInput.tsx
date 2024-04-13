import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

type Props = {
  sentence: string;
  setSentence: React.Dispatch<React.SetStateAction<string>>;
};

export const EgSentenceInput = ({ sentence, setSentence }: Props) => {
  return (
    <div className="flex flex-col items-center gap-y-1">
      <div className="flex w-full justify-between">
        <label className="text-md" htmlFor="egSentence">
          Example Sentences
        </label>
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
