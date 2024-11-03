import "./style.css";
import { useState } from "react";
import React from "react";
import Results from "../results";

const Scoreboard = ({
  questions,
  score,
  correctAnswers,
  wrongAnswers,
  blankAnswers,
  onReplay,
  userAnswers,
}) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const handleToggle = () => {
    setShowAnswers((prevState) => !prevState);
  };
  return (
    <>
      <div className="container">
        <h1>Oyun Bitti! Skorun: {score}</h1>
        <div className="result-container">
          <div className="result">
            <h3>Dogru Cevap: {correctAnswers}</h3>
          </div>
          <div className="result">
            <h3>Yanlis Cevap: {wrongAnswers}</h3>
          </div>
          <div className="result">
            <h3>Bos Birakilan: {blankAnswers}</h3>
          </div>
        </div>
        <Results
          showAnswers={showAnswers}
          userAnswers={userAnswers}
          questions={questions}
        />
        <div className="btn-group">
          <button onClick={onReplay}>Tekrar</button>
          <button onClick={handleToggle}>Cevaplari Goster</button>
        </div>
      </div>
    </>
  );
};

export default Scoreboard;
