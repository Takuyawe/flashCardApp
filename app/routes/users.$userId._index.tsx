import { AIGenerationButton } from '~/components/newWord/AIGenerationButton';
import { CategorySelect } from '~/components/newWord/CategorySelect';
import { DefinitionInput } from '~/components/newWord/DefinitionInput';
import { EgSentenceInput } from '~/components/newWord/EgSentenceInput';
import { SaveButton } from '~/components/newWord/SaveButton';
import { WordCard } from '~/components/newWord/WordCard';

export default function Index() {
  return (
    <div className="h-5/6 flex flex-col items-center justify-center gap-y-7">
      <AIGenerationButton />
      <CategorySelect />
      <WordCard />
      <DefinitionInput />
      <EgSentenceInput />
      <SaveButton />
    </div>
  );
}
