export const CLAUDE_MODEL = "claude-3-haiku-20240307";

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
export const QUIZ_WORD_INSTRUCTION = `Write 10 words in English that are related to "input". Do not include any other text. Put "/" between each word.`;
export const QUIZ_SENTENCE_INSTRUCTION = `Write a sentence in English for each word in this list that contains 10 words: ["input"]. Thus, generate 10 sentences. Do not include any other text other than sentences. Put "/" between each sentence.`;

// export const QUIZ_WORD_INSTRUCTION = `「input」に関連する英語の単語を10個書いてください。他のテキストは含めず、各単語をスラッシュ「/」で区切ってください。`;
// export const QUIZ_SENTENCE_INSTRUCTION = `このリストにある各単語「["input"]」について、その単語を含む英語の文を一つずつ書いてください。他のテキストは含めず、各文をスラッシュ「/」で区切ってください。`;
