export const speakWord = (word: string) => {
  console.log("speechSynthesis" in window);
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = word;
  utterance.lang = "ja-JP";
  window.speechSynthesis.speak(utterance);
};
