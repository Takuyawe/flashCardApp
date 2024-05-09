export const CLAUDE_MODEL = 'claude-3-haiku-20240307';

// export const DEFINITION_INSTRUCTION = {
//   BEGINNER: `この単語"word"の定義で書いてください。ただし、文字数は15文字以下で、定義文以外は返さないでください。また、漢字は使わないでください。`,
//   ADVANCED: `この単語"word"の定義で書いてください。ただし、文字数は15文字以下で、定義文以外は返さないでください。`,
// };

export const DEFINITION_INSTRUCTION = {
  BEGINNER: `Write a meaning in English for "word" within 10 characters. Do not include any other text in the definition.`,
  ADVANCED: `この単語"word"の定義で書いてください。ただし、文字数は15文字以下で、定義文以外は返さないでください。`,
};

export const SENTENCE_INSTRUCTION = {
  BEGINNER: `この単語"word"の例文を1つ日本語で書いてください。ただし、文字数は15文字以下で、例文以外は返さないでください。また、その例文の後に"/"を挿入し、その後に例文の意味を英語で書いてください。`,
  ADVANCED: `この単語"word"の例文を1つ日本語で書いてください。ただし、文字数は15文字以下で、例文以外は返さないでください。`,
};

// For quiz
export const QUIZ_INSTRUCTION = `この単語"word"に関する日本語の単語を10個書いてください。また、最後の単語以外の各単語の後に"/"を挿入してください。あと、単語以外は何も書かないでください。`;
