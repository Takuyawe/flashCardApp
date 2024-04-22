import { convertToRomaji } from './convertToRomaji';

export const convertSentenceToRomaji = (text: string[]) => {
  text.pop();
  const sentenceRomaji = convertToRomaji(text.join(' '));
  return sentenceRomaji + '.';
};
