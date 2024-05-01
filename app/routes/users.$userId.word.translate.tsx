import { parseWithZod } from '@conform-to/zod';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { Translator } from 'deepl-node';
import { WORD_REQUIRED_ERROR } from '~/constants/NewWord';
import { translateSchema } from '~/zodSchema/newWord';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: translateSchema,
  });
  if (submission.status !== 'success') {
    return json({
      error: WORD_REQUIRED_ERROR,
    });
  }
  const word = formData.get('word') as string;
  const authKey = process.env.DEEPL_API as string;
  const translator = new Translator(authKey);

  try {
    const { text } = await translator.translateText(word, 'en', 'ja');
    return json({ text });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return json({ error: error.message });
    }
  }
};
