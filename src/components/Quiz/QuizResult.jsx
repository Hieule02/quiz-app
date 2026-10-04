import React from "react";

const QuizResult = ({ score, totalQuestions, onRestart }) => {
    const percentage =
        totalQuestions === 0 ? 0 : Math.round((score / totalQuestions) * 100);

    return (
        <div className="quiz-result">
            <h1>Quiz Completed!</h1>

            <div className="quiz-result__score">
                <strong>
                    {score} / {totalQuestions}
                </strong>
            </div>

            <div className="quiz-result__percentage">{percentage}%</div>

            <button type="button" onClick={onRestart}>
                Restart Quiz
            </button>
        </div>
    );
};

export default QuizResult;
