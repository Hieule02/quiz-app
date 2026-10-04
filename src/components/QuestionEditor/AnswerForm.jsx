import React from "react";

const AnswerForm = ({ answer, index, onChange, onDelete }) => {
    return (
        <div className="answer-form">
            <div className="answer-form__header">
                <strong>Answer {index + 1}</strong>

                <button type="button" className="danger" onClick={onDelete}>
                    Remove
                </button>
            </div>

            <div className="answer-form__body">
                <input
                    type="text"
                    value={answer.text}
                    placeholder="Answer text"
                    onChange={(e) =>
                        onChange({
                            ...answer,
                            text: e.target.value,
                        })
                    }
                />

                <label>
                    <input
                        type="checkbox"
                        checked={answer.correct}
                        onChange={(e) =>
                            onChange({
                                ...answer,
                                correct: e.target.checked,
                            })
                        }
                    />
                    Correct answer
                </label>
            </div>
        </div>
    );
};

export default AnswerForm;
