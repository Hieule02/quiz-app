import { DEFAULT_QUIZ_SETTINGS, STORAGE_KEYS } from "../utils/constants";

export const saveSettings = (settings) => {
    localStorage.setItem(STORAGE_KEYS.QUIZ_SETTINGS, JSON.stringify(settings));
};

export const getSettings = () => {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZ_SETTINGS);

    if (!data) {
        return DEFAULT_QUIZ_SETTINGS;
    }

    try {
        return {
            ...DEFAULT_QUIZ_SETTINGS,
            ...JSON.parse(data),
        };
    } catch (error) {
        console.error("Failed to parse quiz settings:", error);

        return DEFAULT_QUIZ_SETTINGS;
    }
};

export const saveQuestions = (questions) => {
    localStorage.setItem(
        STORAGE_KEYS.QUIZ_QUESTIONS,
        JSON.stringify(questions),
    );
};

export const getQuestions = () => {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZ_QUESTIONS);

    if (!data) {
        return null;
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Failed to parse questions:", error);

        return null;
    }
};

export const clearQuizData = () => {
    localStorage.removeItem(STORAGE_KEYS.QUIZ_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_QUESTIONS);
};
