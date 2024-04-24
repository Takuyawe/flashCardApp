type Props = {
  errorMessage: string;
};

export const ErrorMessage = ({ errorMessage }: Props) => {
  return (
    <div className="grid place-content-center h-9 w-60 bg-bright-red text-white text-lg rounded-md">
      {errorMessage}
    </div>
  );
};
