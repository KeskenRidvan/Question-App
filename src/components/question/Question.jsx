import "./style.css";
import React, { useEffect } from "react";

const Question = ({ question, currentQuestion, onAnswer, showAnswers }) => {
  useEffect(() => {
    const answerTimeout = setTimeout(() => {
      if (!showAnswers) {
        onAnswer(null); // Consider as blank answer if time runs out
      }
    }, 4000);

    return () => clearTimeout(answerTimeout);
  }, [showAnswers, onAnswer]);

  return (
    <div className="container question-container">
      <div className="question-content">
        <h3 className="question-number">Soru {currentQuestion + 1}</h3>
        {question.media && <img src={question.media} alt={question.question} />}
        <h2>{question.question}</h2>
      </div>
      <div className="options">
        {showAnswers &&
          question.options.map((option, index) => (
            <button id="option" key={index} onClick={() => onAnswer(index)}>
              {option}
            </button>
          ))}
      </div>
      {!showAnswers && <p>Cevaplar 4 saniye icinde gorunecektir...</p>}
    </div>
  );
};

export default Question;
