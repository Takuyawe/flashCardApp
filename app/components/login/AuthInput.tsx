type Props = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthInput = ({
  label,
  name,
  placeholder,
  value,
  setValue,
}: Props) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-md" htmlFor="definition">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-60 border-2 border-base-dark rounded-md pl-2 text-lg"
      />
    </div>
  );
};
