import React, { createContext, useContext, useState } from "react";

import { DEFAULT_QUIZ_SETTINGS } from "../utils/constants";

import { getSettings, saveSettings } from "../services/storageService";

const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => getSettings());

    const updateSettings = (newSettings) => {
        setSettings((prev) => {
            const updatedSettings = {
                ...prev,
                ...newSettings,
            };

            saveSettings(updatedSettings);

            return updatedSettings;
        });
    };

    const resetSettings = () => {
        setSettings(DEFAULT_QUIZ_SETTINGS);
        saveSettings(DEFAULT_QUIZ_SETTINGS);
    };

    return (
        <QuizContext.Provider
            value={{
                settings,
                updateSettings,
                resetSettings,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};

export const useQuizContext = () => {
    const context = useContext(QuizContext);

    if (!context) {
        throw new Error("useQuizContext must be used inside QuizProvider");
    }

    return context;
};
