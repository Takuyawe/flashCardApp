import { convertToRomaji } from './convertToRomaji';

export const convertSentenceToRomaji = (text: string[]) => {
  return convertToRomaji(text.join(' ')).replace(/\s+$/, '');
};
