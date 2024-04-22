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
      'User-Agent': `Yahoo AppID: ${process.env.YAHOO_CLIENT_ID}`,
    },
    body: JSON.stringify(reqData),
  });

  return await response.json();
};
