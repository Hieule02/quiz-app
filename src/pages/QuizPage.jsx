import React from "react";

import QuizContainer from "../components/Quiz/QuizContainer";

import { useQuestionContext } from "../context/QuestionContext";

const QuizPage = () => {
    const { questions } = useQuestionContext();

    return <QuizContainer questions={questions} />;
};

export default QuizPage;
