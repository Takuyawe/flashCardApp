import Anthropic from '@anthropic-ai/sdk';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { convertSentenceToRomaji } from '~/modules/word/convertSentenceToRomaji';
import { createDefinitionWithAI } from '~/modules/word/createDefinitionWithAI';
import { createSentenceWithAI } from '~/modules/word/createSentenceWithAI';
import { getSentenceKanaWithYahoo } from '~/modules/word/getSentenceKanaWithYahoo';

export const action = async ({ request }: ActionFunctionArgs) => {
  const apiKey = process.env.CLAUDE_API;
  const anthropic = new Anthropic({
    apiKey: apiKey,
  });
  const formData = await request.formData();
  const word = formData.get('word');

  // TODO: server side validation with conform

  try {
    const definitionResponse = await createDefinitionWithAI(
      anthropic,
      word as string
    );

    const sentenceResponse = await createSentenceWithAI(
      anthropic,
      word as string
    );

    if (!definitionResponse || !sentenceResponse)
      return json({
        error: 'Failed to generate definition and sentence',
      });

    const definitionText = definitionResponse?.content[0].text;

    const sentenceText = sentenceResponse?.content[0].text.split('/');

    const sentence = sentenceText[0].trim();
    const sentenceTranslation = sentenceText[1].trim();
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
