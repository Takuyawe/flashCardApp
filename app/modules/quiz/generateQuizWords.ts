import Anthropic from '@anthropic-ai/sdk';
import { CLAUDE_MODEL } from '~/constants/AIInstruction';

type GenerateQuizWords = (
  anthropic: Anthropic,
  instruction: string,
  word: string
) => Promise<string[] | undefined>;

export const generateQuizWords: GenerateQuizWords = async (
  anthropic,
  instruction,
  word
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
              text: instruction.replace('word', word),
            },
          ],
        },
      ],
    });
    if (response) {
      return response.content[0].text.split('/').map((word) => word.trim());
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
