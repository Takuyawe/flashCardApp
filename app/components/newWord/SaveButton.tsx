import { Form } from '@remix-run/react';

type Props = {
  word: string;
  definition: string;
  sentence: string;
  categoryId: string;
};

export const SaveButton = ({
  word,
  definition,
  sentence,
  categoryId,
}: Props) => {
  return (
    <Form method="post">
      <input type="hidden" name="categoryId" value={categoryId} />
      <input type="hidden" name="word" value={word} />
      <input type="hidden" name="definition" value={definition} />
      <input type="hidden" name="sentence" value={sentence} />
      <button className="h-12 w-72 bg-base-dark text-white rounded-3xl text-2xl">
        Save
      </button>
    </Form>
  );
};
