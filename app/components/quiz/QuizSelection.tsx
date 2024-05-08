import { QuizSelectionItem } from './QuizSelectionItem';

export const QuizSelection = () => {
  return (
    <div className="flex flex-col h-2/3 items-center justify-center gap-y-8">
      <span className="text-xl text-base-dark">
        Let&apos;s learn with quiz !
      </span>
      <QuizSelectionItem to={'new'} content="NEW WORD" />
      <QuizSelectionItem to="" content="RANDOM" />
      <QuizSelectionItem to="" content="CATEGORY" />
    </div>
  );
};
