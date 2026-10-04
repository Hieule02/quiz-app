import { useCallback, useEffect, useState } from "react";

const useTimer = (initialTime, onTimeUp) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);

    const start = useCallback(() => {
        setIsRunning(true);
    }, []);

    const stop = useCallback(() => {
        setIsRunning(false);
    }, []);

    const reset = useCallback(
        (newTime = initialTime) => {
            setTimeLeft(newTime);
            setIsRunning(false);
        },
        [initialTime],
    );

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        if (timeLeft <= 0) {
            setIsRunning(false);
            onTimeUp?.();
            return;
        }

        const timerId = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [isRunning, timeLeft, onTimeUp]);

    return {
        timeLeft,
        isRunning,
        start,
        stop,
        reset,
    };
};

export default useTimer;
