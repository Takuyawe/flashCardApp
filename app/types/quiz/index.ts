// export type QuizLevel = 'easy' | 'normal' | 'hard';

export type QuizOption = Pick<
  QuizWord,
  'word' | 'kana' | 'definition' | 'isCorrectAnswer'
> & {
  multipleChoice?: QuizOptionList;
};

export type QuizOptionList = QuizOption[];

export type QuizWord = {
  word: string;
  kana: string;
  definition: string;
  multipleChoice: QuizOptionList;
  isCorrectAnswer: boolean;
};

export type QuizWordList = QuizWord[];
