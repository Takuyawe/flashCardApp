import {
  CLAUDE_MODEL,
  DEFINITION_INSTRUCTION,
} from '~/constants/AIInstruction';
import Anthropic from '@anthropic-ai/sdk';

export const createDefinitionWithAI = async (
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
              text: DEFINITION_INSTRUCTION.BEGINNER.replace('word', word),
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
