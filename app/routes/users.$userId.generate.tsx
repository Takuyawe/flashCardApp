import Anthropic from "@anthropic-ai/sdk";
import { ActionFunctionArgs, json } from "@remix-run/node";
import {
  CLAUDE_MODEL,
  DEFINITION_INSTRUCTION,
  SENTENCE_INSTRUCTION,
} from "~/constants/AIInstruction";

export const action = async ({ request }: ActionFunctionArgs) => {
  const apiKey = process.env.CLAUDE_API;
  const anthropic = new Anthropic({
    apiKey: apiKey,
  });
  const formData = await request.formData();
  const word = formData.get("word");

  // TODO: server side validation
  // TODO: try catch statement

  const definitionResponse = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 100,
    temperature: 1,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: DEFINITION_INSTRUCTION.BEGINNER.replace(
              "word",
              word as string
            ),
          },
        ],
      },
    ],
  });

  const sentenceResponse = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 100,
    temperature: 1,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: SENTENCE_INSTRUCTION.BEGINNER.replace("word", word as string),
          },
        ],
      },
    ],
  });

  console.log(sentenceResponse);

  return json({ definitionResponse, sentenceResponse });
};
