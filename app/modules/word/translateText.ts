import { SourceLanguageCode, TargetLanguageCode, Translator } from "deepl-node";

type TranslateText = (
  word: string,
  from: SourceLanguageCode,
  to: TargetLanguageCode
) => Promise<string>;

export const translateText: TranslateText = async (word, from, to) => {
  const authKey = process.env.DEEPL_API as string;
  const translator = new Translator(authKey);
  const { text } = await translator.translateText(word, from, to);
  return text;
};
