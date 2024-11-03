import React, { useState, useEffect } from "react";
import "./App.css";
import questions from "../public/data";
import Question from "./components/question";
import Timer from "./components/timer";
import Scoreboard from "./components/scoreboard";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [blankAnswers, setBlankAnswers] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleStart = () => {
    setGameStarted(true);
    setShowAnswers(false); // Ensure answers are hidden at the start
    setTimeRemaining(30); // Reset timer
    setCurrentQuestion(0); // Reset to the first question
    setScore(0); // Reset score
    setCorrectAnswers(0); // Reset correct answers
    setWrongAnswers(0); // Reset wrong answers
    setBlankAnswers(0); // Reset blank answers
    setGameOver(false); // Reset game over state
  };

  useEffect(() => {
    let timer;
    if (gameStarted && timeRemaining > 0 && !gameOver) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (!gameOver && timeRemaining === 0) {
      setBlankAnswers((prev) => prev + 1);
      setUserAnswers((prev) => [...prev, null]);
      handleNextQuestion();
      console.log([currentQuestion, blankAnswers, userAnswers]);
    }
    return () => clearInterval(timer);
  }, [timeRemaining, gameOver, gameStarted]);

  // Show answers after 4 seconds from the start of the game
  useEffect(() => {
    if (gameStarted) {
      const answerTimeout = setTimeout(() => {
        setShowAnswers(true); // Show answers after 4 seconds
      }, 4000);

      return () => clearTimeout(answerTimeout);
    }
  }, [gameStarted, currentQuestion]); // Runs when gameStarted changes

  const handleAnswer = (index) => {
    setShowAnswers(false);
    setUserAnswers((prev) => [...prev, index]);

    const selectedOption = questions[currentQuestion].options[index]; // Take the selected option
    const correctAnswer = questions[currentQuestion].answer; // Take the correct answer

    if (selectedOption === correctAnswer) {
      // Check if the selected option is the correct answer
      setCorrectAnswers((prev) => prev + 1);
      setScore((prev) => prev + 10);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }

    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeRemaining(30);
      setShowAnswers(false); // Reset showAnswers for the next question
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    handleStart(); // Use handleStart to reset the game
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <div className="container">
          <h1>
            Soru Oyununa <br /> Hos Geldin!
          </h1>

          <div className="rules-container">
            <h2>Kurallarimiz var ama endiselenme cok basit kurallar!</h2>
            <div className="rule">
              <p>
                1- Oyunu tamamlamak icin 10 soruya cevap vermeniz gerekiyor.
              </p>
              <p>2- Her soru icin size verilen sure 30 saniyedir.</p>
              <p>
                3- Sorulari cevaplarken dikkatli olun geriye donemeyeceksin!
              </p>
            </div>
          </div>
          <button id="start-btn" onClick={handleStart}>
            Baslat
          </button>
        </div>
      ) : gameOver ? (
        <Scoreboard
          score={score}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          blankAnswers={blankAnswers}
          onReplay={restartGame}
          userAnswers={userAnswers}
          questions={questions}
        />
      ) : (
        <div>
          <Timer
            timeRemaining={timeRemaining}
            currentQuestion={currentQuestion}
          />
          <Question
            question={questions[currentQuestion]}
            currentQuestion={currentQuestion}
            onAnswer={handleAnswer}
            showAnswers={showAnswers}
          />
        </div>
      )}
    </div>
  );
};
export default App;
