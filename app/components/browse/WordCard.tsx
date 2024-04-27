import { Word } from "@prisma/client";
import { speakWord } from "~/modules/browse/speakWord";

type Props = {
  word: Word;
};

export const WordCard = ({ word }: Props) => {
  return (
    <div className="h-32 w-72 rounded-lg border border-base-dark  px-2">
      <div className="flex items-center justify-start gap-x-1">
        <button onClick={() => speakWord(word.name)}>
          <i className="ri-speak-fill text-lg" />
        </button>
        <span>
          {word.name} /{" "}
          {word.definition.replaceAll(".", "").replaceAll(`"`, "")}
        </span>
        <button className="ml-auto">
          <i className="ri-delete-bin-line text-lg" />
        </button>
      </div>
      <div className="flex flex-col">
        <span className="text-sm">Example sentence</span>
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
