import { useRecoilState } from 'recoil';
import { newWordFieldsAtom } from '~/atoms/atom';

export const EgSentenceInput = () => {
  const [newWordFields, setNewWordFields] = useRecoilState(newWordFieldsAtom);

  return (
    <div className="flex flex-col items-center gap-y-1">
      <div className="flex w-full justify-between">
        <label className="text-xs" htmlFor="egSentence">
          Example Sentences <span className="text-bright-red">*</span>
        </label>
      </div>
      <input
        name="exampleSentence"
        value={newWordFields.sentence}
        onChange={(e) =>
          setNewWordFields({ ...newWordFields, sentence: e.target.value })
        }
        placeholder="Write an example sentence"
        className="h-8 w-80 border-2 border-base-dark rounded-md pl-2 pt-1 text-sm"
      />
      <input
        name="exampleSentenceKana"
        value={newWordFields.sentenceKana.trim()}
        onChange={(e) =>
          setNewWordFields({ ...newWordFields, sentenceKana: e.target.value })
        }
        placeholder="Sentence kana (optional)"
        className="h-8 w-80 border-2 border-base-dark rounded-md pl-2 pt-1 text-sm"
      />
      <input
        name="exampleSentenceRomaji"
        value={newWordFields.sentenceRomaji}
        onChange={(e) =>
          setNewWordFields({ ...newWordFields, sentenceRomaji: e.target.value })
        }
        placeholder="Sentence romaji (optional)"
        className="h-8 w-80 border-2 border-base-dark rounded-md pl-2 pt-1 text-sm"
      />
      <input
        name="exampleSentenceTranslation"
        value={newWordFields.sentenceTranslation}
        onChange={(e) =>
          setNewWordFields({
            ...newWordFields,
            sentenceTranslation: e.target.value,
          })
        }
        placeholder="Sentence translation (optional)"
        className="h-8 w-80 border-2 border-base-dark rounded-md pl-2 pt-1 text-sm"
      />
    </div>
  );
};
