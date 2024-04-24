type Props = {
  onClick: () => void;
};

export const ShowMoreButton = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} className="">
      Show more ...
    </button>
  );
};
