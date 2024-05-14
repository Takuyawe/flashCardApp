import { ActionFunctionArgs, json } from '@remix-run/node';
import { addNewWord } from '~/modules/prisma';
import { QuizWordList } from '~/types/quiz';

type Payload = {
  userId: string;
  categoryId: string;
  words: QuizWordList;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const dataString = formData.get('data') as string;
  const { userId, categoryId, words }: Payload = JSON.parse(dataString);

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
