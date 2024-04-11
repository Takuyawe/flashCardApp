import Anthropic from '@anthropic-ai/sdk';
import { ActionFunctionArgs, json } from '@remix-run/node';

export const action = async ({ request }: ActionFunctionArgs) => {
  const apiKey = process.env.CLAUDE_API;
  const anthropic = new Anthropic({
    apiKey: apiKey,
  });
  const formData = await request.formData();
  const word = formData.get('word');

  // TODO: server side validation

  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 100,
    temperature: 1,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `この単語"${word}"の例文を書いてください。ただし、文字数は30文字以下で、例文以外は返さないでください。`,
          },
        ],
      },
    ],
  });

  console.log(response);

  return json({ response });
};
