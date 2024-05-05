import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Translator } from "deepl-node";
import { WORD_REQUIRED_ERROR } from "~/constants/NewWord";
import { getYahooAnalysisData } from "~/modules/word/getYahooAnalysisData";
import { translateText } from "~/modules/word/translateText";
import { translateSchema } from "~/zodSchema/newWord";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: translateSchema,
  });
  if (submission.status !== "success") {
    return json({
      error: WORD_REQUIRED_ERROR,
    });
  }
  const word = formData.get("word") as string;

  try {
    const text = await translateText(word, "en", "ja");
    const { result } = await getYahooAnalysisData(text);
    const kana = result.tokens[0][1];
    return json({ text, kana });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return json({ error: error.message });
    }
  }
};
