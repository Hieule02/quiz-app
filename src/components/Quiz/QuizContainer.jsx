import React, { useCallback, useEffect } from "react";

import useQuiz from "../../hooks/useQuiz";
import useTimer from "../../hooks/useTimer";

import { QUIZ_STATUS } from "../../utils/constants";

import { useQuizContext } from "../../context/QuizContext";

import Question from "./Question";
import QuizTimer from "./QuizTimer";
import QuizProgress from "./QuizProgress";
import QuizResult from "./QuizResult";

const QuizContainer = ({ questions }) => {
    const { settings } = useQuizContext();

    const quiz = useQuiz(questions, settings);

    const {
        currentQuestion,
        currentIndex,
        selectedAnswers,
        score,
        status,
        progress,
        isLastQuestion,
        startQuiz,
        selectAnswer,
        nextQuestion,
        restartQuiz,
    } = quiz;

    const handleTimeUp = useCallback(() => {
        nextQuestion();
    }, [nextQuestion]);

    const timer = useTimer(settings.timePerQuestion, handleTimeUp);

    useEffect(() => {
        if (status === QUIZ_STATUS.IN_PROGRESS && currentQuestion) {
            timer.reset(settings.timePerQuestion);

            timer.start();
        }
    }, [status, currentQuestion, currentIndex, settings.timePerQuestion]);

    useEffect(() => {
        if (status === QUIZ_STATUS.FINISHED) {
            timer.stop();
        }
    }, [status]);

    const handleStartQuiz = () => {
        startQuiz();
    };

    const handleNext = () => {
        if (selectedAnswers.length === 0) {
            return;
        }

        timer.stop();

        nextQuestion();
    };

    const handleRestart = () => {
        timer.stop();

        restartQuiz();
    };

    if (status === QUIZ_STATUS.NOT_STARTED) {
        return (
            <div className="quiz-start">
                <h1>Quiz App</h1>

                <p>Test your knowledge with this quiz.</p>

                <p>
                    Time per question:{" "}
                    <strong>{settings.timePerQuestion}s</strong>
                </p>

                <p>
                    Questions:{" "}
                    <strong>
                        {Math.min(settings.numberOfQuestions, questions.length)}
                    </strong>
                </p>

                <button type="button" onClick={handleStartQuiz}>
                    Start Quiz
                </button>
            </div>
        );
    }

    if (status === QUIZ_STATUS.FINISHED) {
        return (
            <QuizResult
                score={score}
                totalQuestions={quiz.questions.length}
                onRestart={handleRestart}
            />
        );
    }

    return (
        <div className="quiz-container">
            <QuizProgress
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                progress={progress}
            />

            <QuizTimer timeLeft={timer.timeLeft} />

            <Question
                question={currentQuestion}
                selectedAnswers={selectedAnswers}
                onSelectAnswer={selectAnswer}
            />

            <div className="quiz-actions">
                <button
                    type="button"
                    disabled={selectedAnswers.length === 0}
                    onClick={handleNext}
                >
                    {isLastQuestion ? "Finish" : "Next"}
                </button>
            </div>
        </div>
    );
};

export default QuizContainer;
