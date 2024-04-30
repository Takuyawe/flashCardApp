import { convertToRomaji } from "./convertToRomaji";

export const convertSentenceToRomaji = (text: string[]) => {
  const sentenceRomaji = convertToRomaji(text.join(" "));
  return sentenceRomaji[-1] === "?" ? sentenceRomaji + "." : sentenceRomaji;
};
