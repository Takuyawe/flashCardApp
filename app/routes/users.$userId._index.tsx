import { useState } from 'react';
import { AIGenerationButton } from '~/components/newWord/AIGenerationButton';
import { CategorySelect } from '~/components/newWord/CategorySelect';
import { DefinitionInput } from '~/components/newWord/DefinitionInput';
import { EgSentenceInput } from '~/components/newWord/EgSentenceInput';
import { SaveButton } from '~/components/newWord/SaveButton';
import { WordCard } from '~/components/newWord/WordCard';

export default function Index() {
  const [word, setWord] = useState<string>('');

  return (
    <div className="h-body flex flex-col items-center justify-center gap-y-7">
      <AIGenerationButton />
      <CategorySelect />
      <WordCard setWord={setWord} />
      <DefinitionInput />
      <EgSentenceInput word={word} />
      <SaveButton />
    </div>
  );
}
