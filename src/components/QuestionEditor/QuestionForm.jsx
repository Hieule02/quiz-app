import React, { useEffect, useState } from "react";

import AnswerForm from "./AnswerForm";

const createAnswer = (id) => ({
    id,
    text: "",
    correct: false,
});

const createEmptyQuestion = () => ({
    question: "",
    type: "single",
    answers: [
        createAnswer("A"),
        createAnswer("B"),
        createAnswer("C"),
        createAnswer("D"),
    ],
    explanation: "",
});

const QuestionForm = ({ editingQuestion, onSave, onCancel }) => {
    const [form, setForm] = useState(createEmptyQuestion());

    useEffect(() => {
        if (editingQuestion) {
            setForm({
                ...editingQuestion,
                answers: editingQuestion.answers.map((answer) => ({
                    ...answer,
                })),
            });

            return;
        }

        setForm(createEmptyQuestion());
    }, [editingQuestion]);

    const handleQuestionChange = (value) => {
        setForm((prev) => ({
            ...prev,
            question: value,
        }));
    };

    const handleTypeChange = (value) => {
        if (value === "true_false") {
            setForm((prev) => ({
                ...prev,
                type: value,
                answers: [
                    {
                        id: "TRUE",
                        text: "True",
                        correct: false,
                    },
                    {
                        id: "FALSE",
                        text: "False",
                        correct: false,
                    },
                ],
            }));

            return;
        }

        setForm((prev) => ({
            ...prev,
            type: value,
            answers:
                prev.answers.length >= 2
                    ? prev.answers
                    : [createAnswer("A"), createAnswer("B")],
        }));
    };

    const handleAnswerChange = (index, answer) => {
        setForm((prev) => ({
            ...prev,
            answers: prev.answers.map((item, itemIndex) =>
                itemIndex === index ? answer : item,
            ),
        }));
    };

    const handleDeleteAnswer = (index) => {
        setForm((prev) => ({
            ...prev,
            answers: prev.answers.filter((_, itemIndex) => itemIndex !== index),
        }));
    };

    const handleAddAnswer = () => {
        const nextId = String.fromCharCode(65 + form.answers.length);

        setForm((prev) => ({
            ...prev,
            answers: [...prev.answers, createAnswer(nextId)],
        }));
    };

    const handleExplanationChange = (value) => {
        setForm((prev) => ({
            ...prev,
            explanation: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const questionText = form.question.trim();

        if (!questionText) {
            alert("Please enter the question.");

            return;
        }

        const validAnswers = form.answers.filter((answer) =>
            answer.text.trim(),
        );

        if (validAnswers.length < 2) {
            alert("Please provide at least 2 answers.");

            return;
        }

        const correctAnswers = form.answers.filter((answer) => answer.correct);

        if (correctAnswers.length === 0) {
            alert("Please select at least one correct answer.");

            return;
        }

        if (form.type === "single" && correctAnswers.length !== 1) {
            alert(
                "Single choice question must have exactly one correct answer.",
            );

            return;
        }

        const normalizedQuestion = {
            ...form,
            question: questionText,
            answers: form.answers
                .filter((answer) => answer.text.trim())
                .map((answer, index) => ({
                    ...answer,
                    id: String.fromCharCode(65 + index),
                })),
            explanation: form.explanation.trim(),
        };

        onSave(normalizedQuestion);
    };

    return (
        <form className="question-form" onSubmit={handleSubmit}>
            <div className="question-form__header">
                <h2>{editingQuestion ? "Edit Question" : "Create Question"}</h2>
            </div>

            <div className="form-group">
                <label>Question</label>

                <textarea
                    rows="4"
                    value={form.question}
                    placeholder="Enter your question..."
                    onChange={(e) => handleQuestionChange(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Question Type</label>

                <select
                    value={form.type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                >
                    <option value="single">Single Choice</option>

                    <option value="multiple">Multiple Choice</option>

                    <option value="true_false">True / False</option>
                </select>
            </div>

            <div className="form-group">
                <div className="form-group__header">
                    <label>Answers</label>

                    <button type="button" onClick={handleAddAnswer}>
                        + Add Answer
                    </button>
                </div>

                <div className="answer-list">
                    {form.answers.map((answer, index) => (
                        <AnswerForm
                            key={answer.id}
                            answer={answer}
                            index={index}
                            onChange={(updatedAnswer) =>
                                handleAnswerChange(index, updatedAnswer)
                            }
                            onDelete={() => handleDeleteAnswer(index)}
                        />
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Explanation</label>

                <textarea
                    rows="4"
                    value={form.explanation}
                    placeholder="Explain the correct answer..."
                    onChange={(e) => handleExplanationChange(e.target.value)}
                />
            </div>

            <div className="question-form__actions">
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>

                <button type="submit" className="primary">
                    {editingQuestion ? "Update Question" : "Create Question"}
                </button>
            </div>
        </form>
    );
};

export default QuestionForm;
