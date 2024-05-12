import Anthropic from "@anthropic-ai/sdk";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { generate } from "random-words";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { quizCategoryAtom, quizWordListAtom } from "~/atoms/atom";
import { QuizCard } from "~/components/quiz/QuizCard";
import { QuizStepper } from "~/components/quiz/QuizStepper";
import {
  QUIZ_WORD_INSTRUCTION,
  QUIZ_SENTENCE_INSTRUCTION,
} from "~/constants/AIInstruction";
import { generateQuizWordsAndSentences } from "~/modules/quiz/generateQuizWordsAndSentences";
import { getGooHiraganaWord } from "~/modules/quiz/getGooHiraganaWord";
import { convertToRomaji } from "~/modules/word/convertToRomaji";
// import { convertSentenceToRomaji } from '~/modules/word/convertSentenceToRomaji';
// import { createSentenceWithAI } from '~/modules/word/createSentenceWithAI';
// import { getKanaAndPardWithYahoo } from '~/modules/word/getKanaAndPartWithYahoo';
// import { getSentenceKanaWithYahoo } from '~/modules/word/getSentenceKanaWithYahoo';
import { translateText } from "~/modules/word/translateText";
import { QuizOptionList, QuizWordList } from "~/types/quiz";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const category = params.category;

  if (!category) {
    return json({
      error: "Something went wrong. Please try again.",
    });
  }

  const apiKey = process.env.CLAUDE_API;
  const anthropic = new Anthropic({
    apiKey: apiKey,
  });

  try {
    const response = await generateQuizWordsAndSentences(
      anthropic,
      category as string
    );

    if ("error" in response) {
      return json({
        error: "Something went wrong. Please try again.",
      });
    }

    const { words, sentences } = response;

    const randomWords = generate({
      minLength: 3,
      maxLength: 10,
      exactly: 30,
    }) as string[];
    const quizWords: QuizWordList = await Promise.all(
      words.map(async (enWord, index) => {
        const definition = enWord.toLowerCase();
        const jaWord = await translateText(definition, "en", "ja");
        const kana = await getGooHiraganaWord(jaWord);
        const sentenceTranslation = sentences[index];
        console.log(sentenceTranslation);
        const sentence = await translateText(sentenceTranslation, "en", "ja");
        console.log(sentence);
        const sentenceKana = await getGooHiraganaWord(sentence);
        console.log(sentenceKana);
        const sentenceRomaji = convertToRomaji(sentenceKana);
        const multipleChoice: QuizOptionList = await Promise.all(
          randomWords
            .slice(index * 3, index * 3 + 3)
            .map(async (optionDefinition) => {
              const optionJaWord = await translateText(
                optionDefinition,
                "en",
                "ja"
              );
              const optionKana = await getGooHiraganaWord(optionJaWord);
              return {
                word: optionJaWord,
                kana: optionKana,
                definition: optionDefinition,
                isCorrectAnswer: false,
              };
            })
        );
        // const { sentenceArr, sentenceKana } = await getSentenceKanaWithYahoo(
        //   sentence
        // );
        // const sentenceRomaji = convertSentenceToRomaji(sentenceArr);

        return {
          word: jaWord,
          kana,
          definition,
          multipleChoice,
          sentence,
          sentenceKana,
          sentenceRomaji,
          sentenceTranslation,
          isCorrectAnswer: true,
        };
      })
    );
    console.log(quizWords);

    return json({ category, quizWords });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return json({
        error: error.message,
      });
    }
  }
};

export default function Layout() {
  const loaderData = useLoaderData<typeof loader>();
  const [, setQuizWordList] = useRecoilState(quizWordListAtom);
  const [, setQuizCategory] = useRecoilState(quizCategoryAtom);

  useEffect(() => {
    if (!loaderData || "error" in loaderData) return;

    console.log(loaderData.quizWords);

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
