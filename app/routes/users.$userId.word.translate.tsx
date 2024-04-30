import { ActionFunctionArgs, json } from '@remix-run/node';
import { Translator } from 'deepl-node';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const word = formData.get('enWord') as string;
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
