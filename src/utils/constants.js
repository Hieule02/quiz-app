export const QUIZ_STATUS = {
    NOT_STARTED: "NOT_STARTED",
    IN_PROGRESS: "IN_PROGRESS",
    FINISHED: "FINISHED",
};

export const QUESTION_TYPE = {
    SINGLE: "single",
    MULTIPLE: "multiple",
    TRUE_FALSE: "true_false",
};

export const DEFAULT_QUIZ_SETTINGS = {
    timePerQuestion: 30,
    numberOfQuestions: 20,
    randomQuestions: false,
    randomAnswers: false,
    autoNext: true,
    showExplanation: true,
};

export const STORAGE_KEYS = {
    QUIZ_SETTINGS: "quiz-settings",
    QUIZ_QUESTIONS: "quiz-questions",
};
