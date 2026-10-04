import React, { useState } from "react";

import QuizPage from "./pages/QuizPage";
import SettingsPage from "./pages/SettingsPage";
import QuestionManagementPage from "./pages/QuestionManagementPage";

import { QuizProvider } from "./context/QuizContext";
import { QuestionProvider } from "./context/QuestionContext";

const App = () => {
    const [page, setPage] = useState("quiz");

    return (
        <QuizProvider>
            <QuestionProvider>
                <div className="app">
                    <div className="app-header">
                        <h1>Quiz App</h1>

                        <div className="app-header__actions">
                            <button
                                type="button"
                                onClick={() => setPage("quiz")}
                            >
                                Quiz
                            </button>

                            <button
                                type="button"
                                onClick={() => setPage("questions")}
                            >
                                Questions
                            </button>

                            <button
                                type="button"
                                onClick={() => setPage("settings")}
                            >
                                Settings
                            </button>
                        </div>
                    </div>

                    {page === "settings" && (
                        <SettingsPage onBack={() => setPage("quiz")} />
                    )}

                    {page === "questions" && (
                        <QuestionManagementPage
                            onBack={() => setPage("quiz")}
                        />
                    )}

                    {page === "quiz" && <QuizPage />}
                </div>
            </QuestionProvider>
        </QuizProvider>
    );
};

export default App;
