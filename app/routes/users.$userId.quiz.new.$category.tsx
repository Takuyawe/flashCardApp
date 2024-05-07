import Anthropic from '@anthropic-ai/sdk';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QUIZ_INSTRUCTION } from '~/constants/AIInstruction';
import { generateQuizWords } from '~/modules/quiz/generateQuizWords';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const quizLevel = url.searchParams.get('quizLevel');
  const category = params.category;

  if (!quizLevel || !category) {
    return json({
      error: 'Something went wrong. Please try again.',
    });
  }

  const apiKey = process.env.CLAUDE_API;
  const anthropic = new Anthropic({
    apiKey: apiKey,
  });

  const instruction =
    quizLevel === 'easy'
      ? QUIZ_INSTRUCTION.EASY
      : QUIZ_INSTRUCTION.NORMAL_AND_HARD;

  const quizWords = await generateQuizWords(
    anthropic,
    instruction,
    category as string
  );

  return json({ quizWords });
};

export default function Layout() {
  const loaderData = useLoaderData<typeof loader>();

  console.log(loaderData);

  return '';
}
