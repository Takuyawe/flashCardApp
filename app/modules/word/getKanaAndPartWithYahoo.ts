import { getYahooAnalysisData } from './getYahooAnalysisData';

export const getKanaAndPardWithYahoo = async (text: string) => {
  const response = await getYahooAnalysisData(text);
  const data = response.result.tokens[0];
  const kana = data[1];
  const part = data[3];
  return { kana, part };
};
