type GenerateWordLetterByLetter = (
  text: string,
  setter: React.Dispatch<React.SetStateAction<string>>
) => void;

export const generateWordLetterByLetter: GenerateWordLetterByLetter = (
  text,
  setter
) => {
  const intervalId = setInterval(() => {
    setter((prevState) => {
      if (prevState.length < text.length) {
        return prevState + text[prevState.length];
      } else {
        clearInterval(intervalId);
        return prevState;
      }
    });
  }, 50);
};
