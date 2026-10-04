import React from "react";

const QuestionList = ({ questions, onEdit, onDelete }) => {
    if (questions.length === 0) {
        return <div className="question-list-empty">No questions found.</div>;
    }

    return (
        <div className="question-list">
            {questions.map((question, index) => (
                <div key={question.id} className="question-list__item">
                    <div className="question-list__number">{index + 1}</div>

                    <div className="question-list__content">
                        <div className="question-list__title">
                            {question.question}
                        </div>

                        <div className="question-list__meta">
                            <span>Type: {question.type}</span>

                            <span>Answers: {question.answers.length}</span>
                        </div>
                    </div>

                    <div className="question-list__actions">
                        <button type="button" onClick={() => onEdit(question)}>
                            Edit
                        </button>

                        <button
                            type="button"
                            className="danger"
                            onClick={() => onDelete(question.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuestionList;
