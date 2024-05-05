type Props = {
  onClick: () => void;
};

export const ShowMoreButton = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} className="text-sm opacity-80">
      Show more ...
    </button>
  );
};
