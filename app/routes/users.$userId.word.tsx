import { ActionFunctionArgs, json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { AIGenerationButton } from "~/components/newWord/AIGenerationButton";
import { CategorySelectContainer } from "~/components/newWord/CategorySelectContainer";
import { DefinitionInput } from "~/components/newWord/DefinitionInput";
import { EgSentenceInput } from "~/components/newWord/EgSentenceInput";
import { SaveButton } from "~/components/newWord/SaveButton";
import { WordInput } from "~/components/newWord/WordInput";
import { convertToRomaji } from "~/modules/word/convertToRomaji";
import { addNewWord } from "~/modules/prisma";
import { useRecoilState } from "recoil";
import { categoriesAtom, newWordFieldsAtom, userAtom } from "~/atoms/atom";
import { getKanaAndPardWithYahoo } from "~/modules/word/getKanaAndPartWithYahoo";
import { useActionData, useLoaderData } from "@remix-run/react";
import { UndoButton } from "~/components/newWord/UndoButton";
import { Word } from "@prisma/client";
import { typedjson } from "remix-typedjson";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const word = formData.get("word");
  const definition = formData.get("definition");
  const sentence = formData.get("sentence");
  const sentenceKana = formData.get("sentenceKana");
  const sentenceRomaji = formData.get("sentenceRomaji");
  const sentenceTranslation = formData.get("sentenceTranslation");
  const userId = formData.get("userId");
  const categoryId = formData.get("categoryId");

  const { kana, part } = await getKanaAndPardWithYahoo(word as string);
  const romajiWord = convertToRomaji(kana);
  const now = new Date();

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

  return typedjson({ newWord });
};

export default function Index() {
  const data = useActionData<typeof action>();
  const [newWord, setNewWord] = useState<Word>(data?.newWord);
  const [isUndoButtonOpen, setIsUndoButtonOpen] = useState<boolean>(false);
  const [isWordUndone, setIsWordUndone] = useState<boolean>(false);
  const [newWordFields, setNewWordFields] = useRecoilState(newWordFieldsAtom);
  const [user] = useRecoilState(userAtom);

  useEffect(() => {
    if (!data) return;
    if (data.newWord) {
      setNewWordFields({
        word: "",
        definition: "",
        sentence: "",
        sentenceKana: "",
        sentenceRomaji: "",
        sentenceTranslation: "",
        category: "",
        chosenCategoryId: "",
      });
      setIsUndoButtonOpen(true);
      setNewWord(data.newWord);
    }
  }, [data]);

  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-4">
      {isUndoButtonOpen && (
        <UndoButton
          isWordUndone={isWordUndone}
          setIsWordUndone={setIsWordUndone}
          setIsUndoButtonOpen={setIsUndoButtonOpen}
          newWord={newWord}
        />
      )}
      <CategorySelectContainer />
      <WordInput />
      <AIGenerationButton />
      <DefinitionInput />
      <EgSentenceInput />
      <SaveButton userId={user?.id as string} />
    </div>
  );
}
