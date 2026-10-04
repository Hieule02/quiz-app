import React, { useState } from "react";

import TimeSetting from "./TimeSetting";

import { DEFAULT_QUIZ_SETTINGS } from "../../utils/constants";

import { useQuizContext } from "../../context/QuizContext";

const QuizSettings = ({ onBack }) => {
    const { settings, updateSettings, resetSettings } = useQuizContext();

    const [formSettings, setFormSettings] = useState(settings);

    const handleChange = (key, value) => {
        setFormSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSave = () => {
        updateSettings(formSettings);

        alert("Settings saved successfully!");

        onBack();
    };

    const handleReset = () => {
        resetSettings();

        setFormSettings(DEFAULT_QUIZ_SETTINGS);
    };

    return (
        <div className="settings-page">
            <div className="settings-card">
                <div className="settings-header">
                    <div>
                        <h1>Quiz Settings</h1>

                        <p>Configure your quiz before starting.</p>
                    </div>
                </div>

                <div className="settings-content">
                    <TimeSetting
                        value={formSettings.timePerQuestion}
                        onChange={(value) =>
                            handleChange("timePerQuestion", value)
                        }
                    />

                    <div className="setting-item">
                        <div className="setting-item__info">
                            <h3>Number of questions</h3>

                            <p>Set the maximum number of questions.</p>
                        </div>

                        <div className="setting-item__control">
                            <input
                                type="number"
                                min="1"
                                value={formSettings.numberOfQuestions}
                                onChange={(e) =>
                                    handleChange(
                                        "numberOfQuestions",
                                        Number(e.target.value),
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="setting-item">
                        <div className="setting-item__info">
                            <h3>Random questions</h3>

                            <p>Randomize the order of questions.</p>
                        </div>

                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={formSettings.randomQuestions}
                                onChange={(e) =>
                                    handleChange(
                                        "randomQuestions",
                                        e.target.checked,
                                    )
                                }
                            />

                            <span className="switch__slider" />
                        </label>
                    </div>

                    <div className="setting-item">
                        <div className="setting-item__info">
                            <h3>Random answers</h3>

                            <p>Randomize the order of answers.</p>
                        </div>

                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={formSettings.randomAnswers}
                                onChange={(e) =>
                                    handleChange(
                                        "randomAnswers",
                                        e.target.checked,
                                    )
                                }
                            />

                            <span className="switch__slider" />
                        </label>
                    </div>

                    <div className="setting-item">
                        <div className="setting-item__info">
                            <h3>Auto next</h3>

                            <p>
                                Automatically move to the next question after
                                selecting an answer.
                            </p>
                        </div>

                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={formSettings.autoNext}
                                onChange={(e) =>
                                    handleChange("autoNext", e.target.checked)
                                }
                            />

                            <span className="switch__slider" />
                        </label>
                    </div>

                    <div className="setting-item">
                        <div className="setting-item__info">
                            <h3>Show explanation</h3>

                            <p>Show explanation after answering.</p>
                        </div>

                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={formSettings.showExplanation}
                                onChange={(e) =>
                                    handleChange(
                                        "showExplanation",
                                        e.target.checked,
                                    )
                                }
                            />

                            <span className="switch__slider" />
                        </label>
                    </div>
                </div>

                <div className="settings-actions">
                    <button
                        type="button"
                        className="button button--secondary"
                        onClick={handleReset}
                    >
                        Reset
                    </button>

                    <div className="settings-actions__right">
                        <button
                            type="button"
                            className="button button--secondary"
                            onClick={onBack}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="button button--primary"
                            onClick={handleSave}
                        >
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizSettings;
