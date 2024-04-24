type Props = {
  categoryPath: string[];
};

export const CategoryPath = ({ categoryPath }: Props) => {
  return (
    <div className="flex w-72">
      {categoryPath.map((category, index) => (
        <div key={category} className="flex gap-x-1">
          <i className="ri-folder-fill text-gray-500 text-md" />
          <span className="text-base-dark">{category}</span>
          {index !== categoryPath.length - 1 && (
            <i className="ri-arrow-right-s-line" />
          )}
        </div>
      ))}
    </div>
  );
};
