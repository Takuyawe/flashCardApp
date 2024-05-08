import { GOO_HIRAGANA_URL } from '~/constants/WebApiURL';

export const getGooHiraganaWord = async (text: string) => {
  const url = GOO_HIRAGANA_URL;

  const reqData = {
    app_id: process.env.GOO_APP_ID,
    sentence: text,
    output_type: 'hiragana',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqData),
  });

  const data = await response.json();
  return data.converted;
};
