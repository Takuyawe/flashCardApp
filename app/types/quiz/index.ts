export type QuizLevel = 'easy' | 'normal' | 'hard';

export type QuizOption = Pick<QuizWord, 'word' | 'kana' | 'definition'>;

export type QuizWord = {
  word: string;
  kana: string;
  definition: string;
  multipleChoice: QuizOption[];
};

export type QuizWordList = QuizWord[];
