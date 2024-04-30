import { z } from 'zod';
import {
  CATEGORY_REQUIRED_ERROR,
  DEFINITION_REQUIRED_ERROR,
  SENTENCE_REQUIRED_ERROR,
  WORD_REQUIRED_ERROR,
} from '~/constants/NewWord';

const wordSchema = z.string({ required_error: WORD_REQUIRED_ERROR });
const definitionSchema = z.string({
  required_error: DEFINITION_REQUIRED_ERROR,
});
const sentenceSchema = z.string({
  required_error: SENTENCE_REQUIRED_ERROR,
});
const categorySchema = z.string({
  required_error: CATEGORY_REQUIRED_ERROR,
});
export const newWordSchema = z.object({
  word: wordSchema,
  definition: definitionSchema,
  sentence: sentenceSchema,
  categoryId: categorySchema,
});
