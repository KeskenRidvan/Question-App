import { useState, useEffect, useRef } from "react";
import React from "react";
import "./style.css";

const Timer = ({ timeRemaining, currentQuestion }) => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, [currentQuestion]);

  const strokeColor = timeRemaining <= 10 ? "red" : "var(--primary-color)";

  return (
    <div id="timer">
      <div id="time">{timeRemaining}</div>
      <svg
        key={animationKey}
        className="time-indicator"
        style={{ animationDuration: `${timeRemaining}s` }}
      >
        <circle r="18" cx="20" cy="20"></circle>
      </svg>
    </div>
  );
};

export default Timer;
