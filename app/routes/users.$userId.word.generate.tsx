import Anthropic from "@anthropic-ai/sdk";
import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { WORD_REQUIRED_ERROR } from "~/constants/NewWord";
import { convertSentenceToRomaji } from "~/modules/word/convertSentenceToRomaji";
import { createDefinitionWithAI } from "~/modules/word/createDefinitionWithAI";
import { createSentenceWithAI } from "~/modules/word/createSentenceWithAI";
import { getSentenceKanaWithYahoo } from "~/modules/word/getSentenceKanaWithYahoo";
import { translateText } from "~/modules/word/translateText";
import { generateAISchema } from "~/zodSchema/newWord";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: generateAISchema,
  });
  if (submission.status !== "success") {
    return json({
      error: WORD_REQUIRED_ERROR,
    });
  }
  const word = formData.get("word") as string;
  const apiKey = process.env.CLAUDE_API;
  const anthropic = new Anthropic({
    apiKey: apiKey,
  });

  try {
    const sentenceResponse = await createSentenceWithAI(anthropic, word);

    if (!sentenceResponse)
      return json({
        error: "Failed to generate definition and sentence",
      });

    const definitionText = await translateText(word, "ja", "en-US");

    const sentenceText = sentenceResponse?.content[0].text.split("/");

    const sentence = sentenceText[0].trim();
    const sentenceTranslation = sentenceText[1].trim();
    const { sentenceArr, sentenceKana } = await getSentenceKanaWithYahoo(
      sentence
    );
    const sentenceRomaji = convertSentenceToRomaji(sentenceArr);

    return json({
      definitionText,
      sentence,
      sentenceKana,
      sentenceRomaji,
      sentenceTranslation,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return json({
        error: error.message,
      });
    }
  }
};
