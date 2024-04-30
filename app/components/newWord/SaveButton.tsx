import { Form } from '@remix-run/react';
import { useRecoilState } from 'recoil';
import { newWordFieldsAtom } from '~/atoms/atom';

type Props = {
  userId: string;
  isGenerating: boolean;
};

export const SaveButton = ({ userId, isGenerating }: Props) => {
  const [newWordFields] = useRecoilState(newWordFieldsAtom);

  return (
    <Form method="post">
      <input type="hidden" name="userId" value={userId} />
      <input
        type="hidden"
        name="categoryId"
        value={newWordFields.chosenCategoryId}
      />
      <input type="hidden" name="word" value={newWordFields.word} />
      <input type="hidden" name="definition" value={newWordFields.definition} />
      <input type="hidden" name="sentence" value={newWordFields.sentence} />
      <input
        type="hidden"
        name="sentenceKana"
        value={newWordFields.sentenceKana}
      />
      <input
        type="hidden"
        name="sentenceRomaji"
        value={newWordFields.sentenceRomaji}
      />
      <input
        type="hidden"
        name="sentenceTranslation"
        value={newWordFields.sentenceTranslation}
      />
      <button
        type="submit"
        disabled={isGenerating}
        className="h-8 w-72 bg-base-dark text-white rounded-3xl text-lg">
        {isGenerating ? (
          <span className="flex items-center justify-center gap-x-2">
            <i className="ri-loader-2-line text-xl animate-spin" />
            Wait for a second ...
          </span>
        ) : (
          'Save'
        )}
      </button>
    </Form>
  );
};
