import React from "react";

const QuizProgress = ({ currentIndex, totalQuestions, progress }) => {
    return (
        <div className="quiz-progress">
            <div className="quiz-progress__header">
                <span>
                    Question {currentIndex + 1} / {totalQuestions}
                </span>

                <span>{Math.round(progress)}%</span>
            </div>

            <div className="quiz-progress__bar">
                <div
                    className="quiz-progress__value"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>
        </div>
    );
};

export default QuizProgress;
