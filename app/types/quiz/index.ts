// export type QuizLevel = 'easy' | 'normal' | 'hard';

export type QuizOption = Pick<
  QuizWord,
  "word" | "kana" | "definition" | "isCorrectAnswer"
> & {
  multipleChoice?: QuizOptionList;
};

export type QuizOptionList = QuizOption[];

export type QuizWord = {
  word: string;
  kana: string;
  definition: string;
  multipleChoice: QuizOptionList;
  sentence: string;
  sentenceKana: string;
  sentenceRomaji: string;
  sentenceTranslation: string;
  isCorrectAnswer: boolean;
};

export type QuizWordList = QuizWord[];
