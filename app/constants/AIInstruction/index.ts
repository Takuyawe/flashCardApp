export const CLAUDE_MODEL = 'claude-3-haiku-20240307';

// export const DEFINITION_INSTRUCTION = {
//   BEGINNER: `この単語"word"の定義で書いてください。ただし、文字数は15文字以下で、定義文以外は返さないでください。また、漢字は使わないでください。`,
//   ADVANCED: `この単語"word"の定義で書いてください。ただし、文字数は15文字以下で、定義文以外は返さないでください。`,
// };

export const DEFINITION_INSTRUCTION = {
  BEGINNER: `Write a definition in English for "word" in 15 characters or less. Do not include any other text in the definition.`,
  ADVANCED: `この単語"word"の定義で書いてください。ただし、文字数は15文字以下で、定義文以外は返さないでください。`,
};

export const SENTENCE_INSTRUCTION = {
  BEGINNER: `この単語"word"の例文を1つ日本語で書いてください。ただし、文字数は30文字以下で、例文以外は返さないでください。また、漢字は使わないでください。`,
  ADVANCED: `この単語"word"の例文を1つ日本語で書いてください。ただし、文字数は30文字以下で、例文以外は返さないでください。`,
};
