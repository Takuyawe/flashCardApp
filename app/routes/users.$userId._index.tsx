import { useState } from 'react';
import { AIGenerationButton } from '~/components/newWord/AIGenerationButton';
import { CategorySelect } from '~/components/newWord/CategorySelect';
import { DefinitionInput } from '~/components/newWord/DefinitionInput';
import { EgSentenceInput } from '~/components/newWord/EgSentenceInput';
import { SaveButton } from '~/components/newWord/SaveButton';
import { WordInput } from '~/components/newWord/WordInput';

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
      <SaveButton />
    </div>
  );
}
