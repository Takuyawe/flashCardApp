export const getResultMessage = (correctAnswerCount: number) => {
  if (correctAnswerCount === 0) {
    return "No worries! Every quiz is an opportunity to learn. Try again and you'll see improvement!";
  } else if (correctAnswerCount > 0 && correctAnswerCount < 4) {
    return "You've got the basics down! With a little more practice, you'll be hitting the higher scores in no time.";
  } else if (correctAnswerCount >= 4 && correctAnswerCount < 7) {
    return "Nice effort! You're halfway there. Review a bit more and you'll see even better results.";
  } else if (correctAnswerCount >= 7 && correctAnswerCount < 10) {
    return "Great job! You're almost at the top. A little extra push and you could reach perfection!";
  } else if (correctAnswerCount === 10) {
    return 'Perfect score! Congratulations, you nailed it! Keep up the fantastic work.';
  } else {
    return 'Hmm, something seems off. Check your input and try submitting again!';
  }
};
