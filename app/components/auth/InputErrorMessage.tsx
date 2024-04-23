type Props = {
  errorMessage: string;
};

export const InputErrorMessage = ({ errorMessage }: Props) => {
  return <div className="text-bright-red text-sm mt-0">{errorMessage}</div>;
};
