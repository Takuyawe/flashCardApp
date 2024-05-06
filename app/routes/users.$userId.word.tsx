import { ActionFunctionArgs } from "@remix-run/node";
import { useEffect, useState } from "react";
import { AIGenerationButton } from "~/components/newWord/AIGenerationButton";
import { DefinitionInput } from "~/components/newWord/DefinitionInput";
import { EgSentenceInput } from "~/components/newWord/EgSentenceInput";
import { SaveButton } from "~/components/newWord/SaveButton";
import { WordInput } from "~/components/newWord/WordInput";
import { convertToRomaji } from "~/modules/word/convertToRomaji";
import { addNewWord } from "~/modules/prisma";
import { useRecoilState } from "recoil";
import { newWordFieldsAtom, userAtom } from "~/atoms/atom";
import { getKanaAndPardWithYahoo } from "~/modules/word/getKanaAndPartWithYahoo";
import { useActionData } from "@remix-run/react";
import { UndoButton } from "~/components/newWord/UndoButton";
import { Word } from "@prisma/client";
import { typedjson } from "remix-typedjson";
import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { newWordSchema } from "~/zodSchema/newWord";
import { FAILED_TO_ADD_WORD } from "~/constants/NewWord";
import { AnimatePresence } from "framer-motion";
import { EnWordTranslation } from "~/components/newWord/EnWordTranslation";
import { WordOfToday } from "~/components/newWord/WordOfToday";
import { CategorySelectBox } from "~/components/newWord/CategorySelectBox";

type ActionResponse = {
  message?: string;
  newWord?: Word;
  submission?: SubmissionResult;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: newWordSchema,
  });
  if (submission.status !== "success") {
    return typedjson<ActionResponse>({
      message: FAILED_TO_ADD_WORD,
      submission: submission.reply(),
    });
  }
  const word = formData.get("word");
  const definition = formData.get("definition");
  const sentence = formData.get("sentence");
  const sentenceKana = formData.get("sentenceKana");
  const sentenceRomaji = formData.get("sentenceRomaji");
  const sentenceTranslation = formData.get("sentenceTranslation");
  const userId = formData.get("userId");
  const categoryId = formData.get("categoryId");

  if (
    !word ||
    !definition ||
    !userId ||
    !categoryId ||
    !sentence ||
    !sentenceKana ||
    !sentenceRomaji ||
    !sentenceTranslation
  )
    throw new Error("Necessary fields not found");

  const { kana, part } = await getKanaAndPardWithYahoo(word as string);
  const romajiWord = convertToRomaji(kana);
  const now = new Date();

  try {
    const newWord = await addNewWord(
      word as string,
      definition as string,
      userId as string,
      categoryId as string,
      kana,
      romajiWord,
      part,
      sentence as string,
      now,
      sentenceKana as string,
      sentenceRomaji as string,
      sentenceTranslation as string
    );
    return typedjson<ActionResponse>({
      newWord,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return typedjson<ActionResponse>({ message: error.message });
    }
  }
};

export default function Index() {
  const actionResponse = useActionData<typeof action>();
  const [newWord, setNewWord] = useState<Word>(actionResponse?.newWord);
  const [isUndoButtonOpen, setIsUndoButtonOpen] = useState<boolean>(false);
  const [isWordUndone, setIsWordUndone] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [, setNewWordFields] = useRecoilState(newWordFieldsAtom);
  const [user] = useRecoilState(userAtom);

  useEffect(() => {
    if (!actionResponse) return;
    if (actionResponse.newWord) {
      setNewWordFields({
        word: "",
        kana: "",
        definition: "",
        sentence: "",
        sentenceKana: "",
        sentenceRomaji: "",
        sentenceTranslation: "",
        category: "",
        chosenCategoryId: "",
      });
      setIsUndoButtonOpen(true);
      setNewWord(actionResponse.newWord);
    }

    setTimeout(() => {
      setIsWordUndone(false);
      setIsUndoButtonOpen(false);
    }, 7000);
  }, [actionResponse, setNewWordFields]);

  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-4">
      <AnimatePresence>
        {isUndoButtonOpen && (
          <UndoButton
            isWordUndone={isWordUndone}
            setIsWordUndone={setIsWordUndone}
            setIsUndoButtonOpen={setIsUndoButtonOpen}
            newWord={newWord}
          />
        )}
      </AnimatePresence>
      {actionResponse?.message && (
        <div className="grid place-items-center text-bright-red text-lg h-8 w-80 rounded-sm border border-base-dark">
          {actionResponse.message}
        </div>
      )}
      <WordOfToday />
      <CategorySelectBox />
      <EnWordTranslation />
      <WordInput />
      <AIGenerationButton
        isGenerating={isGenerating}
        setIsGenerating={setIsGenerating}
      />
      <DefinitionInput />
      <EgSentenceInput />
      <SaveButton userId={user?.id as string} isGenerating={isGenerating} />
    </div>
  );
}
