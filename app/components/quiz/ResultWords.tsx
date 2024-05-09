import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  quizCategoryAtom,
  quizCorrectAnswerCountAtom,
  quizWordListAtom,
} from '~/atoms/atom';

export const ResultWords = () => {
  const [quizWordList] = useRecoilState(quizWordListAtom);
  const [quizCorrectAnswerCount] = useRecoilState(quizCorrectAnswerCountAtom);
  const [quizCategory] = useRecoilState(quizCategoryAtom);
  const [isWordExpanded, setIsWordExpanded] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-80 gap-y-1">
      <div className="flex justify-between">
        <span className="text-base-dark">Category: {quizCategory}</span>
        <div className="flex gap-x-2">
          <button>
            <i className="ri-folder-reduce-line text-xl" />
          </button>
          <button>
            <i className="ri-add-box-line text-xl" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        {quizWordList.map((word, index) => (
          <div
            className="flex items-center gap-x-2 pl-1 border border-base-dark rounded-sm"
            key={word.definition}>
            {quizCorrectAnswerCount[index] === 0 ? (
              <i className="ri-close-line text-xl text-bright-red" />
            ) : (
              <i className="ri-circle-line text-xl text-bright-green" />
            )}
            <span className="text-base-dark">
              {word.word} / {word.definition}
            </span>
            {/* move to another component */}
            <div className="ml-auto mr-3">
              {isWordExpanded ? (
                <button onClick={() => setIsWordExpanded(false)}>
                  <i className="ri-arrow-down-wide-line" />
                </button>
              ) : (
                <button onClick={() => setIsWordExpanded(true)}>
                  <i className="ri-arrow-up-wide-line" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
