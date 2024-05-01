type SearchWithKMP = (word: string, inputText: string) => number;

export const searchWithKMP: SearchWithKMP = (word, inputText) => {
  if (inputText.length === 0) {
    return 0; // Immediate match if inputText is empty
  }

  // Compute the prefix table
  const prefixTable = new Array(inputText.length).fill(0);
  let j = 0;
  for (let i = 1; i < inputText.length; i++) {
    while (j > 0 && inputText[i] !== inputText[j]) {
      j = prefixTable[j - 1];
    }
    if (inputText[i] === inputText[j]) {
      j++;
      prefixTable[i] = j;
    }
  }

  // Perform the search
  j = 0;
  for (let i = 0; i < word.length; i++) {
    while (j > 0 && word[i] !== inputText[j]) {
      j = prefixTable[j - 1];
    }
    if (word[i] === inputText[j]) {
      j++;
    }
    if (j === inputText.length) {
      return i - j + 1; // Match found at index i - j + 1
    }
  }

  return -1;
};
