import React from "react";

const TimeSetting = ({ value, onChange }) => {
    return (
        <div className="setting-item">
            <div className="setting-item__info">
                <h3>Time per question</h3>
                <p>Set the time limit for each question.</p>
            </div>

            <div className="setting-item__control">
                <input
                    type="number"
                    min="5"
                    max="300"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                />

                <span>seconds</span>
            </div>
        </div>
    );
};

export default TimeSetting;
