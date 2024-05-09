import Anthropic from '@anthropic-ai/sdk';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { generate } from 'random-words';
import { useEffect } from 'react';
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
import { QuizOptionList, QuizWordList } from '~/types/quiz';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const category = params.category;

  if (!category) {
    return json({
      error: 'Something went wrong. Please try again.',
    });
  }

  const apiKey = process.env.CLAUDE_API;
  const anthropic = new Anthropic({
    apiKey: apiKey,
  });

  const instruction = QUIZ_INSTRUCTION;

  const generatedWords = await generateQuizWords(
    anthropic,
    instruction,
    category as string
  );

  if (!generatedWords) {
    return json({
      error: 'Something went wrong. Please try again.',
    });
  }

  const randomWords = generate({
    minLength: 3,
    maxLength: 10,
    exactly: 30,
  }) as string[];
  const quizWords: QuizWordList = await Promise.all(
    generatedWords?.map(async (word, index) => {
      const kana = await getGooHiraganaWord(word);
      const multipleChoice: QuizOptionList = await Promise.all(
        randomWords.slice(index, index + 3).map(async (definition) => {
          const word = await translateText(definition, 'en', 'ja');
          const kana = await getGooHiraganaWord(word);
          return { word, kana, definition, isCorrectAnswer: false };
        })
      );
      const definition = await translateText(word, 'ja', 'en-US');

      // const claudeResponse = await createSentenceWithAI(anthropic, word);

      // const { sentence, sentenceTranslation } = claudeResponse!;
      // const { sentenceArr, sentenceKana } = await getSentenceKanaWithYahoo(
      //   sentence
      // );
      // const sentenceRomaji = convertSentenceToRomaji(sentenceArr);

      return {
        word,
        kana,
        definition,
        multipleChoice,
        isCorrectAnswer: true,
      };
    })
  );

  // const quizWords = [
  //   {
  //     word: 'たべもの',
  //     kana: 'たべもの',
  //     definition: 'food',
  //     multipleChoice: [
  //       {
  //         word: '野菜',
  //         kana: 'やさい',
  //         definition: 'vegetable',
  //         isCorrectAnswer: false,
  //       },
  //       {
  //         word: 'のみもの',
  //         kana: 'のみもの',
  //         definition: 'drinks',
  //         isCorrectAnswer: false,
  //       },
  //       {
  //         word: '果物',
  //         kana: 'くだもの',
  //         definition: 'fruits',
  //         isCorrectAnswer: false,
  //       },
  //     ],
  //     isCorrectAnswer: true,
  //   },
  //   {
  //     word: 'しょくひん',
  //     kana: 'しょくひん',
  //     definition: 'commodity',
  //     multipleChoice: [
  //       {
  //         word: 'たべもの',
  //         kana: 'たべもの',
  //         definition: 'food',
  //         isCorrectAnswer: false,
  //       },
  //       {
  //         word: 'たべもの',
  //         kana: 'たべもの',
  //         definition: 'food',
  //         isCorrectAnswer: false,
  //       },
  //       {
  //         word: 'たべもの',
  //         kana: 'たべもの',
  //         definition: 'food',
  //         isCorrectAnswer: false,
  //       },
  //     ],
  //     isCorrectAnswer: true,
  //   },
  // ];

  return json({ category, quizWords });
};

export default function Layout() {
  const loaderData = useLoaderData<typeof loader>();
  const [quizWordList, setQuizWordList] = useRecoilState(quizWordListAtom);
  const [quizCategory, setQuizCategory] = useRecoilState(quizCategoryAtom);

  useEffect(() => {
    if (!loaderData || 'error' in loaderData) return;

    setQuizWordList(loaderData.quizWords);
    setQuizCategory(loaderData.category);
  }, [loaderData, setQuizWordList, setQuizCategory]);

  return (
    <div className="flex flex-col items-center gap-y-5 mt-5">
      <QuizStepper />
      <QuizCard />
    </div>
  );
}
