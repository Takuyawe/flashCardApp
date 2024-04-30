import { useRecoilState } from 'recoil';
import { newWordFieldsAtom } from '~/atoms/atom';

export const DefinitionInput = () => {
  const [newWordFields, setNewWordFields] = useRecoilState(newWordFieldsAtom);

  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-xs" htmlFor="definition">
        Definition <span className="text-bright-red">*</span>
      </label>
      <input
        name="definition"
        value={newWordFields.definition}
        onChange={(e) =>
          setNewWordFields({ ...newWordFields, definition: e.target.value })
        }
        placeholder="Write a definition"
        className="h-8 w-80 border-2 border-base-dark rounded-md pl-2 text-sm"
      />
    </div>
  );
};
