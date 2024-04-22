import { useEffect } from 'react';

type Props = {
  sentence: string;
  setSentence: React.Dispatch<React.SetStateAction<string>>;
  sentenceKana: string;
  setSentenceKana: React.Dispatch<React.SetStateAction<string>>;
  sentenceRomaji: string;
  setSentenceRomaji: React.Dispatch<React.SetStateAction<string>>;
  sentenceTranslation: string;
  setSentenceTranslation: React.Dispatch<React.SetStateAction<string>>;
};

export const EgSentenceInput = ({
  sentence,
  setSentence,
  sentenceKana,
  setSentenceKana,
  sentenceRomaji,
  setSentenceRomaji,
  sentenceTranslation,
  setSentenceTranslation,
}: Props) => {
  useEffect(() => {
    console.log('Updated Kana:', sentenceKana);
  }, [sentenceKana]);
  return (
    <div className="flex flex-col items-center gap-y-1">
      <div className="flex w-full justify-between">
        <label className="text-sm" htmlFor="egSentence">
          Example Sentences
        </label>
      </div>
      <input
        name="exampleSentence"
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        placeholder="Write an example sentence"
        className="h-10 w-80 border-2 border-base-dark rounded-md pl-2 pt-1 text-md"
      />
      <input
        name="exampleSentenceKana"
        value={sentenceKana.trim()}
        onChange={(e) => {
          console.log(typeof e.target.value);
          console.log(sentenceKana);
          setSentenceKana(e.target.value);
        }}
        placeholder="Sentence kana (optional)"
        className="h-10 w-80 border-2 border-base-dark rounded-md pl-2 pt-1 text-md"
      />
      <input
        name="exampleSentenceRomaji"
        value={sentenceRomaji}
        onChange={(e) => setSentenceRomaji(e.target.value)}
        placeholder="Sentence romaji (optional)"
        className="h-10 w-80 border-2 border-base-dark rounded-md pl-2 pt-1 text-md"
      />
      <input
        name="exampleSentenceTranslation"
        value={sentenceTranslation}
        onChange={(e) => setSentenceTranslation(e.target.value)}
        placeholder="Sentence translation (optional)"
        className="h-10 w-80 border-2 border-base-dark rounded-md pl-2 pt-1 text-md"
      />
    </div>
  );
};
