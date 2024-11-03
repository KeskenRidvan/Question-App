import React from "react";
import "./style.css";

function Results({ showAnswers, questions, userAnswers }) {
  return showAnswers ? (
    <>
      <div className="results-container">
        <h2>Sonuclarin</h2>
        {questions.map((question, index) => (
          <div className="result-item">
            <h4>
              {index + 1}. Soru:
              {question.question}
            </h4>
            <p>
              <strong>Dogru Cevap:</strong> {question.answer}
            </p>
            <p>
              <strong>Cevabin: </strong>
              {userAnswers[index] !== null
                ? question.options[userAnswers[index]]
                : "Bos!"}
            </p>
          </div>
        ))}
      </div>
    </>
  ) : null;
}

export default Results;
