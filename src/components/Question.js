import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // Side effect for countdown timer
  useEffect(() => {
    // Set a timeout to decrease timeRemaining every second
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          // When time hits 0, reset the timer and call onAnswered(false)
          onAnswered(false);
          return 10; // Reset to 10 seconds for the next question
        }
        return prevTime - 1; // Decrease the timer by 1 second
      });
    }, 1000);

    // Cleanup function to clear the timeout when the component unmounts or re-renders
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]); // Dependencies: timeRemaining and onAnswered

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset the timer when an answer is selected
    onAnswered(isCorrect); // Pass the result to the parent component
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
