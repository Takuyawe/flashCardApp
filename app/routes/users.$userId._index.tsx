import { ActionFunctionArgs } from '@remix-run/node';
import { useState } from 'react';
import { AIGenerationButton } from '~/components/newWord/AIGenerationButton';
import { CategorySelect } from '~/components/newWord/CategorySelect';
import { DefinitionInput } from '~/components/newWord/DefinitionInput';
import { EgSentenceInput } from '~/components/newWord/EgSentenceInput';
import { SaveButton } from '~/components/newWord/SaveButton';
import { WordInput } from '~/components/newWord/WordInput';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const word = formData.get('word');
  const definition = formData.get('definition');
  const sentence = formData.get('sentence');

  return { word, definition, sentence };
};

export default function Index() {
  const [word, setWord] = useState<string>('');
  const [definition, setDefinition] = useState<string>('');
  const [sentence, setSentence] = useState<string>('');

  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-8">
      <CategorySelect />
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
