import Anthropic from '@anthropic-ai/sdk';
import { CLAUDE_MODEL, SENTENCE_INSTRUCTION } from '~/constants/AIInstruction';

type CreateSentenceWithAI = (
  anthropic: Anthropic,

  word: string
) => Promise<
  | {
      sentence: string;
      sentenceTranslation: string;
    }
  | undefined
>;

export const createSentenceWithAI: CreateSentenceWithAI = async (
  anthropic: Anthropic,
  word: string
) => {
  try {
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 100,
      temperature: 1,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: SENTENCE_INSTRUCTION.BEGINNER.replace('word', word),
            },
          ],
        },
      ],
    });
    if (response) {
      const sentenceText = response.content[0].text.split('/');
      const sentence = sentenceText[0].trim();
      const sentenceTranslation = sentenceText[1].trim();
      return {
        sentence,
        sentenceTranslation,
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
