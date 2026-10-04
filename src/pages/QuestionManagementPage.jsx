import React, { useMemo, useState } from "react";

import QuestionList from "../components/QuestionEditor/QuestionList";
import QuestionForm from "../components/QuestionEditor/QuestionForm";

import { useQuestionContext } from "../context/QuestionContext";

const QuestionManagementPage = ({ onBack }) => {
    const {
        questions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        resetQuestions,
    } = useQuestionContext();

    const [editingQuestion, setEditingQuestion] = useState(null);

    const [searchText, setSearchText] = useState("");

    const [showForm, setShowForm] = useState(false);

    const filteredQuestions = useMemo(() => {
        const keyword = searchText.trim().toLowerCase();

        if (!keyword) {
            return questions;
        }

        return questions.filter((question) =>
            question.question.toLowerCase().includes(keyword),
        );
    }, [questions, searchText]);

    const handleCreate = () => {
        setEditingQuestion(null);
        setShowForm(true);
    };

    const handleEdit = (question) => {
        setEditingQuestion(question);
        setShowForm(true);
    };

    const handleDelete = (questionId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this question?",
        );

        if (!confirmed) {
            return;
        }

        deleteQuestion(questionId);

        if (editingQuestion?.id === questionId) {
            setEditingQuestion(null);
            setShowForm(false);
        }
    };

    const handleSave = (question) => {
        if (editingQuestion) {
            updateQuestion(editingQuestion.id, question);
        } else {
            const newQuestion = {
                ...question,
                id: Date.now(),
            };

            addQuestion(newQuestion);
        }

        setEditingQuestion(null);
        setShowForm(false);
    };

    const handleCancel = () => {
        setEditingQuestion(null);
        setShowForm(false);
    };

    const handleReset = () => {
        const confirmed = window.confirm(
            "Reset all questions to default questions?",
        );

        if (!confirmed) {
            return;
        }

        resetQuestions();

        setEditingQuestion(null);
        setShowForm(false);
    };

    return (
        <div className="question-management">
            <div className="page-header">
                <div>
                    <h1>Question Management</h1>

                    <p>Manage your quiz questions.</p>
                </div>

                <div className="page-header__actions">
                    <button type="button" onClick={handleReset}>
                        Reset Default
                    </button>

                    <button
                        type="button"
                        className="primary"
                        onClick={handleCreate}
                    >
                        + Add Question
                    </button>
                </div>
            </div>

            {showForm && (
                <QuestionForm
                    editingQuestion={editingQuestion}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}

            {!showForm && (
                <>
                    <div className="question-toolbar">
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />

                        <span>{filteredQuestions.length} question(s)</span>
                    </div>

                    <QuestionList
                        questions={filteredQuestions}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </>
            )}

            <div className="page-footer">
                <button type="button" onClick={onBack}>
                    ← Back to Quiz
                </button>
            </div>
        </div>
    );
};

export default QuestionManagementPage;
