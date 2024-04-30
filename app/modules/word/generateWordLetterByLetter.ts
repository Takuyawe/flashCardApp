import { NewWordFieldsAtom } from '~/types/atom';

type GenerateWordLetterByLetter = (
  text: string,
  fieldName: keyof NewWordFieldsAtom,
  setter: (updater: (prevState: NewWordFieldsAtom) => NewWordFieldsAtom) => void
) => void;

export const generateWordLetterByLetter: GenerateWordLetterByLetter = (
  text,
  fieldName,
  setter
) => {
  let currentIndex = 0;
  const intervalId = setInterval(() => {
    setter((prevState) => {
      if (currentIndex < text.length) {
        const newText = prevState[fieldName] + text[currentIndex];
        currentIndex++;
        return { ...prevState, [fieldName]: newText };
      } else {
        clearInterval(intervalId);
        return prevState;
      }
    });
  }, 50);
};
