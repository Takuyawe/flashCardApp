import Anthropic from '@anthropic-ai/sdk';
import {
  CLAUDE_MODEL,
  QUIZ_SENTENCE_INSTRUCTION,
  QUIZ_WORD_INSTRUCTION,
} from '~/constants/AIInstruction';

type GenerateQuizWordsAndSentences = (
  anthropic: Anthropic,
  word: string
) => Promise<{ words: string[]; sentences: string[] } | { error: string }>;

export const generateQuizWordsAndSentences: GenerateQuizWordsAndSentences =
  async (anthropic, word) => {
    try {
      const wordResponse = await anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 100,
        temperature: 1,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: QUIZ_WORD_INSTRUCTION.replace('input', word),
              },
            ],
          },
        ],
      });
      if (wordResponse) {
        const words = wordResponse.content[0].text;
        const generatedWords = words.split('/').map((word) => word.trim());
        const sentenceResponse = await anthropic.messages.create({
          model: CLAUDE_MODEL,
          max_tokens: 100,
          temperature: 1,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: QUIZ_SENTENCE_INSTRUCTION.replace('input', words),
                },
              ],
            },
          ],
        });

        if (sentenceResponse) {
          const generatedSentences = sentenceResponse.content[0].text
            .split('/')
            .map((sentence) => sentence.trim());
          return { words: generatedWords, sentences: generatedSentences };
        }
      }
      return { error: 'Something went wrong' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: 'Something went wrong: ' + error.message };
      }
      return { error: 'Something went wrong' };
    }
  };
