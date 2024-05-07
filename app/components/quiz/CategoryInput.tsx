import { useState } from 'react';

export const CategoryInput = () => {
  const [text, setText] = useState<string>('');

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm opacity-75">
        Not happy with these categories? <br></br> Enter any category you want
        to learn!
      </span>
      <div className="flex max-w-full gap-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-base-dark pl-2"
          placeholder="Enter a category"
        />
        <button className="bg-base-dark text-white px-2 rounded-md">
          Start
        </button>
      </div>
    </div>
  );
};
