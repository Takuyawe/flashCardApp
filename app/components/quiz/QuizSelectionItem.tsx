import { Link } from '@remix-run/react';

type Props = {
  content: string;
  to: string;
};

export const QuizSelectionItem = ({ content, to }: Props) => {
  return (
    <Link to={to}>
      <button className="h-24 w-72 bg-green-500 text-white text-xl rounded-md">
        {content}
      </button>
    </Link>
  );
};
