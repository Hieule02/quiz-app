import { useCallback, useEffect, useState } from "react";

import { QUIZ_STATUS, QUESTION_TYPE } from "../utils/constants";

const useQuiz = (initialQuestions, settings) => {
    const [questions, setQuestions] = useState(initialQuestions || []);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const [score, setScore] = useState(0);

    const [status, setStatus] = useState(QUIZ_STATUS.NOT_STARTED);

    const [answersHistory, setAnswersHistory] = useState([]);

    const currentQuestion = questions[currentIndex] || null;

    const isLastQuestion = currentIndex === questions.length - 1;

    const progress =
        questions.length === 0
            ? 0
            : ((currentIndex + 1) / questions.length) * 100;

    const shuffleArray = useCallback((array) => {
        const result = [...array];

        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
    }, []);

    const prepareQuestions = useCallback(() => {
        let preparedQuestions = [...initialQuestions];

        if (settings.randomQuestions) {
            preparedQuestions = shuffleArray(preparedQuestions);
        }

        if (settings.numberOfQuestions > 0) {
            preparedQuestions = preparedQuestions.slice(
                0,
                settings.numberOfQuestions,
            );
        }

        if (settings.randomAnswers) {
            preparedQuestions = preparedQuestions.map((question) => ({
                ...question,
                answers: shuffleArray(question.answers),
            }));
        }

        return preparedQuestions;
    }, [initialQuestions, settings, shuffleArray]);

    const startQuiz = useCallback(() => {
        const preparedQuestions = prepareQuestions();

        setQuestions(preparedQuestions);
        setCurrentIndex(0);
        setSelectedAnswers([]);
        setScore(0);
        setAnswersHistory([]);
        setStatus(QUIZ_STATUS.IN_PROGRESS);
    }, [prepareQuestions]);

    const selectAnswer = useCallback(
        (answerId) => {
            if (!currentQuestion) return;

            if (status !== QUIZ_STATUS.IN_PROGRESS) {
                return;
            }

            if (
                currentQuestion.type === QUESTION_TYPE.SINGLE ||
                currentQuestion.type === QUESTION_TYPE.TRUE_FALSE
            ) {
                setSelectedAnswers([answerId]);

                return;
            }

            if (currentQuestion.type === QUESTION_TYPE.MULTIPLE) {
                setSelectedAnswers((prev) => {
                    if (prev.includes(answerId)) {
                        return prev.filter((id) => id !== answerId);
                    }

                    return [...prev, answerId];
                });
            }
        },
        [currentQuestion, status],
    );

    const isCurrentAnswerCorrect = useCallback(() => {
        if (!currentQuestion) {
            return false;
        }

        const correctAnswers = currentQuestion.answers
            .filter((answer) => answer.correct)
            .map((answer) => answer.id)
            .sort();

        const userAnswers = [...selectedAnswers].sort();

        if (correctAnswers.length !== userAnswers.length) {
            return false;
        }

        return correctAnswers.every(
            (answerId, index) => answerId === userAnswers[index],
        );
    }, [currentQuestion, selectedAnswers]);

    const saveCurrentAnswer = useCallback(() => {
        if (!currentQuestion) {
            return false;
        }

        const correct = isCurrentAnswerCorrect();

        if (correct) {
            setScore((prev) => prev + 1);
        }

        setAnswersHistory((prev) => [
            ...prev,
            {
                questionId: currentQuestion.id,
                selectedAnswers: [...selectedAnswers],
                correct,
            },
        ]);

        return correct;
    }, [currentQuestion, selectedAnswers, isCurrentAnswerCorrect]);

    const nextQuestion = useCallback(() => {
        if (!currentQuestion) {
            return;
        }

        saveCurrentAnswer();

        if (isLastQuestion) {
            setStatus(QUIZ_STATUS.FINISHED);

            return;
        }

        setCurrentIndex((prev) => prev + 1);

        setSelectedAnswers([]);
    }, [currentQuestion, saveCurrentAnswer, isLastQuestion]);

    const finishQuiz = useCallback(() => {
        setStatus(QUIZ_STATUS.FINISHED);
    }, []);

    const restartQuiz = useCallback(() => {
        startQuiz();
    }, [startQuiz]);

    const resetQuiz = useCallback(() => {
        setQuestions(initialQuestions || []);

        setCurrentIndex(0);
        setSelectedAnswers([]);
        setScore(0);
        setAnswersHistory([]);
        setStatus(QUIZ_STATUS.NOT_STARTED);
    }, [initialQuestions]);

    useEffect(() => {
        if (initialQuestions && initialQuestions.length === 0) {
            setStatus(QUIZ_STATUS.FINISHED);
        }
    }, [initialQuestions]);

    return {
        questions,
        currentQuestion,
        currentIndex,
        selectedAnswers,
        score,
        status,
        progress,
        answersHistory,
        isLastQuestion,

        settings,

        startQuiz,
        selectAnswer,
        nextQuestion,
        finishQuiz,
        restartQuiz,
        resetQuiz,

        isCurrentAnswerCorrect,
    };
};

export default useQuiz;
