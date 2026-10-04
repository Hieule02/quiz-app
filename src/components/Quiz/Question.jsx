import React from "react";
import AnswerOption from "./AnswerOption";

const Question = ({ question, selectedAnswers, onSelectAnswer }) => {
    if (!question) {
        return null;
    }

    return (
        <div className="question">
            <h2 className="question__title">{question.question}</h2>

            <div className="question__answers">
                {question.answers.map((answer) => (
                    <AnswerOption
                        key={answer.id}
                        answer={answer}
                        selected={selectedAnswers.includes(answer.id)}
                        onSelect={onSelectAnswer}
                    />
                ))}
            </div>
        </div>
    );
};

export default Question;
