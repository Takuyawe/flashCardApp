import { ActionFunctionArgs, json } from '@remix-run/node';
import { addNewWord } from '~/modules/prisma';
import { QuizWordList } from '~/types/quiz';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const userId = formData.get('userId') as string;
  const categoryId = formData.get('categoryId') as string;
  const jsonWords = formData.get('words') as string;

  const words: QuizWordList = JSON.parse(jsonWords);

  const now = new Date();

  for (const word of words) {
    await addNewWord(
      word.word,
      word.definition,
      userId,
      categoryId,
      word.kana,
      '',
      '',
      word.sentence,
      now,
      word.sentenceKana || '',
      word.sentenceRomaji || '',
      word.sentenceTranslation || ''
    );
  }

  return json({ response: 'success' });
};
