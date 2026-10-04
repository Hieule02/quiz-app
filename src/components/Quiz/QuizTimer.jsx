import React from "react";

const QuizTimer = ({ timeLeft }) => {
    const formattedTime = String(timeLeft).padStart(2, "0");

    return (
        <div
            className={`quiz-timer ${
                timeLeft <= 5 ? "quiz-timer--warning" : ""
            }`}
        >
            <span>Time:</span>

            <strong>00:{formattedTime}</strong>
        </div>
    );
};

export default QuizTimer;
