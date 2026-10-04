import React, { createContext, useContext, useState } from "react";

import { defaultQuestions } from "../data/defaultQuestion";

import { getQuestions, saveQuestions } from "../services/storageService";

const QuestionContext = createContext(null);

export const QuestionProvider = ({ children }) => {
    const [questions, setQuestions] = useState(() => {
        const storedQuestions = getQuestions();

        return storedQuestions || defaultQuestions;
    });

    const addQuestion = (question) => {
        setQuestions((prev) => {
            const updatedQuestions = [...prev, question];

            saveQuestions(updatedQuestions);

            return updatedQuestions;
        });
    };

    const updateQuestion = (questionId, updatedQuestion) => {
        setQuestions((prev) => {
            const updatedQuestions = prev.map((question) =>
                question.id === questionId
                    ? {
                          ...updatedQuestion,
                          id: questionId,
                      }
                    : question,
            );

            saveQuestions(updatedQuestions);

            return updatedQuestions;
        });
    };

    const deleteQuestion = (questionId) => {
        setQuestions((prev) => {
            const updatedQuestions = prev.filter(
                (question) => question.id !== questionId,
            );

            saveQuestions(updatedQuestions);

            return updatedQuestions;
        });
    };

    const resetQuestions = () => {
        setQuestions(defaultQuestions);
        saveQuestions(defaultQuestions);
    };

    return (
        <QuestionContext.Provider
            value={{
                questions,
                addQuestion,
                updateQuestion,
                deleteQuestion,
                resetQuestions,
            }}
        >
            {children}
        </QuestionContext.Provider>
    );
};

export const useQuestionContext = () => {
    const context = useContext(QuestionContext);

    if (!context) {
        throw new Error(
            "useQuestionContext must be used inside QuestionProvider",
        );
    }

    return context;
};
