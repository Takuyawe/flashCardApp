import { Form } from '@remix-run/react';

type Props = {
  word: string;
  definition: string;
  sentence: string;
  sentenceKana: string;
  sentenceRomaji: string;
  sentenceTranslation: string;
  categoryId: string;
};

export const SaveButton = ({
  word,
  definition,
  sentence,
  sentenceKana,
  sentenceRomaji,
  sentenceTranslation,
  categoryId,
}: Props) => {
  return (
    <Form method="post">
      <input type="hidden" name="categoryId" value={categoryId} />
      <input type="hidden" name="word" value={word} />
      <input type="hidden" name="definition" value={definition} />
      <input type="hidden" name="sentence" value={sentence} />
      <input type="hidden" name="sentenceKana" value={sentenceKana} />
      <input type="hidden" name="sentenceRomaji" value={sentenceRomaji} />
      <input
        type="hidden"
        name="sentenceTranslation"
        value={sentenceTranslation}
      />
      <button className="h-10 w-72 bg-base-dark text-white rounded-3xl text-xl">
        Save
      </button>
    </Form>
  );
};
