import Anthropic from '@anthropic-ai/sdk';
import { CLAUDE_MODEL, SENTENCE_INSTRUCTION } from '~/constants/AIInstruction';

export const createSentenceWithAI = async (
  anthropic: Anthropic,
  word: string
) => {
  try {
    return await anthropic.messages.create({
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
