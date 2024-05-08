import Anthropic from '@anthropic-ai/sdk';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { generate } from 'random-words';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { quizCategoryAtom, quizWordListAtom } from '~/atoms/atom';
import { QuizCard } from '~/components/quiz/QuizCard';
import { QuizStepper } from '~/components/quiz/QuizStepper';
import { QUIZ_INSTRUCTION } from '~/constants/AIInstruction';
import { generateQuizWords } from '~/modules/quiz/generateQuizWords';
import { getGooHiraganaWord } from '~/modules/quiz/getGooHiraganaWord';
// import { convertSentenceToRomaji } from '~/modules/word/convertSentenceToRomaji';
// import { createSentenceWithAI } from '~/modules/word/createSentenceWithAI';
// import { getKanaAndPardWithYahoo } from '~/modules/word/getKanaAndPartWithYahoo';
// import { getSentenceKanaWithYahoo } from '~/modules/word/getSentenceKanaWithYahoo';
import { translateText } from '~/modules/word/translateText';
import { QuizMultipleChoice, QuizWordList } from '~/types/quiz';

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

  // const generatedWords = await generateQuizWords(
  //   anthropic,
  //   instruction,
  //   category as string
  // );

  // if (!generatedWords) {
  //   return json({
  //     error: 'Something went wrong. Please try again.',
  //   });
  // }

  // const randomWords = generate({
  //   minLength: 3,
  //   maxLength: 10,
  //   exactly: 30,
  // }) as string[];
  // const quizWords: QuizWordList = await Promise.all(
  //   generatedWords?.map(async (word, index) => {
  //     const kana = await getGooHiraganaWord(word);
  //     const multipleChoice: QuizOption[] = await Promise.all(
  //       randomWords.slice(index, index + 3).map(async (definition) => {
  //         const word = await translateText(definition, 'en', 'ja');
  //         const kana = await getGooHiraganaWord(word);
  //         return { word, kana, definition };
  //       })
  //     );
  //     const definition = await translateText(word, 'ja', 'en-US');

  //     // const claudeResponse = await createSentenceWithAI(anthropic, word);

  //     // const { sentence, sentenceTranslation } = claudeResponse!;
  //     // const { sentenceArr, sentenceKana } = await getSentenceKanaWithYahoo(
  //     //   sentence
  //     // );
  //     // const sentenceRomaji = convertSentenceToRomaji(sentenceArr);

  //     return {
  //       word,
  //       kana,
  //       definition,
  //       multipleChoice,
  //     };
  //   })
  // );

  const quizWords = [
    {
      word: 'たべもの',
      kana: 'たべもの',
      definition: 'food',
      multipleChoice: [
        { word: '野菜', kana: 'やさい', definition: 'vegetable' },
        { word: 'のみもの', kana: 'のみもの', definition: 'drinks' },
        { word: '果物', kana: 'くだもの', definition: 'fruits' },
      ],
    },
    {
      word: 'しょくひん',
      kana: 'しょくひん',
      definition: 'commodity',
      multipleChoice: [
        { word: 'たべもの', kana: 'たべもの', definition: 'food' },
        { word: 'たべもの', kana: 'たべもの', definition: 'food' },
        { word: 'たべもの', kana: 'たべもの', definition: 'food' },
      ],
    },
  ];

  return json({ category, quizWords });
};

export default function Layout() {
  const loaderData = useLoaderData<typeof loader>();
  const [quizWordList, setQuizWordList] = useRecoilState(quizWordListAtom);
  const [quizCategory, setQuizCategory] = useRecoilState(quizCategoryAtom);
  const [quizIndex, setQuizIndex] = useState<number>(0);

  useEffect(() => {
    if (!loaderData || 'error' in loaderData) return;

    setQuizWordList(loaderData.quizWords);
    setQuizCategory(loaderData.category);
  }, [loaderData, setQuizWordList, setQuizCategory]);

  return (
    <div className="flex flex-col items-center gap-y-5 mt-5">
      <QuizStepper quizIndex={quizIndex} setQuizIndex={setQuizIndex} />
      <QuizCard ssetQuizIndex={setQuizIndex} et />
    </div>
  );
}
