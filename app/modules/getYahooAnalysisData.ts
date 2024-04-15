import { YAHOO_API_URL } from '~/constants/WebApiURL';

export const getYahooAnalysisData = async (text: string) => {
  const url = YAHOO_API_URL;

  const reqData = {
    id: text,
    jsonrpc: '2.0',
    method: 'jlp.maservice.parse',
    params: {
      q: text,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': `Yahoo AppID: ${process.env.YAHOO_APP_ID}`,
    },
    body: JSON.stringify(reqData),
  });

  const data = await response.json();

  const result = data.result[0];

  const kana = result[1];
  const part = result[3];

  return { kana, part };
};
