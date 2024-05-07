import Anthropic from '@anthropic-ai/sdk';
import { parseWithZod } from '@conform-to/zod';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { WORD_REQUIRED_ERROR } from '~/constants/NewWord';
import { convertSentenceToRomaji } from '~/modules/word/convertSentenceToRomaji';
import { createSentenceWithAI } from '~/modules/word/createSentenceWithAI';
import { getSentenceKanaWithYahoo } from '~/modules/word/getSentenceKanaWithYahoo';
import { translateText } from '~/modules/word/translateText';
import { generateAISchema } from '~/zodSchema/newWord';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: generateAISchema,
  });
  if (submission.status !== 'success') {
    return json({
      error: WORD_REQUIRED_ERROR,
    });
  }
  const word = formData.get('word') as string;
  const apiKey = process.env.CLAUDE_API;
  const anthropic = new Anthropic({
    apiKey: apiKey,
  });

  try {
    const claudeResponse = await createSentenceWithAI(anthropic, word);

    if (!claudeResponse) {
      return json({
        error: 'Something went wrong. Please try again.',
      });
    }

    const { sentence, sentenceTranslation } = claudeResponse;

    const definitionText = await translateText(word, 'ja', 'en-US');
    const { sentenceArr, sentenceKana } = await getSentenceKanaWithYahoo(
      sentence
    );
    const sentenceRomaji = convertSentenceToRomaji(sentenceArr);

    return json({
      definitionText,
      sentence,
      sentenceKana,
      sentenceRomaji,
      sentenceTranslation,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return json({
        error: error.message,
      });
    }
  }
};
