import React from "react";

const AnswerOption = ({ answer, selected, onSelect }) => {
    return (
        <button
            type="button"
            className={`answer-option ${selected ? "selected" : ""}`}
            onClick={() => onSelect(answer.id)}
        >
            <span className="answer-option__label">{answer.id}</span>

            <span className="answer-option__text">{answer.text}</span>
        </button>
    );
};

export default AnswerOption;
