import { getYahooAnalysisData } from './getYahooAnalysisData';

export const getSentenceKanaWithYahoo = async (text: string) => {
  const response = await getYahooAnalysisData(text);
  const data: string[] = response.result.tokens;
  const sentenceArr = data.map((arr) => arr[1]);
  const sentenceKana = sentenceArr.join('');
  return { sentenceArr, sentenceKana };
};
