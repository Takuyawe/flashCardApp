import { Form } from "@remix-run/react";
import { useRecoilState } from "recoil";
import { newWordFieldsAtom } from "~/atoms/atom";

type Props = {
  userId: string;
};

export const SaveButton = ({ userId }: Props) => {
  const [newWordFields, setNewWordFields] = useRecoilState(newWordFieldsAtom);

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
      <button className="h-10 w-72 bg-base-dark text-white rounded-3xl text-xl">
        Save
      </button>
    </Form>
  );
};
