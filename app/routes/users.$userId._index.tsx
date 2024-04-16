import { ActionFunctionArgs, json } from '@remix-run/node';
import { useState } from 'react';
import { AIGenerationButton } from '~/components/newWord/AIGenerationButton';
import { CategorySelectContainer } from '~/components/newWord/CategorySelectContainer';
import { DefinitionInput } from '~/components/newWord/DefinitionInput';
import { EgSentenceInput } from '~/components/newWord/EgSentenceInput';
import { SaveButton } from '~/components/newWord/SaveButton';
import { WordInput } from '~/components/newWord/WordInput';
import { convertToRomaji } from '~/modules/convertToRomaji';
import { getYahooAnalysisData } from '~/modules/getYahooAnalysisData';
import { addNewWord } from '~/modules/prisma';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const word = formData.get('word');
  const definition = formData.get('definition');
  const sentence = formData.get('sentence');

  const { kana, part } = await getYahooAnalysisData(word as string);
  const romajiWord = convertToRomaji(kana);
  const now = new Date();

  const response = addNewWord(
    word as string,
    definition as string,
    '1',
    kana,
    romajiWord,
    part,
    sentence as string,
    now
  );

  return json({ response });
};

export default function Index() {
  const [word, setWord] = useState<string>('');
  const [definition, setDefinition] = useState<string>('');
  const [sentence, setSentence] = useState<string>('');

  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-8">
      <CategorySelectContainer />
      <WordInput word={word} setWord={setWord} />
      <AIGenerationButton
        word={word}
        setDefinition={setDefinition}
        setSentence={setSentence}
      />
      <DefinitionInput definition={definition} setDefinition={setDefinition} />
      <EgSentenceInput sentence={sentence} setSentence={setSentence} />
      <SaveButton word={word} definition={definition} sentence={sentence} />
    </div>
  );
}
