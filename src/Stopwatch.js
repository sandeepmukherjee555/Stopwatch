import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let interval;
        if (isRunning) {
            const now = Date.now();
            setStartTime(now - elapsedTime);
            interval = setInterval(() => {
                const now = Date.now();
                setElapsedTime(now - startTime);
            }, 100);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, startTime, elapsedTime]);

    const startTimer = () => {
        setIsRunning(true);
        setStartTime(Date.now());
    };

    const stopTimer = () => {
        setIsRunning(false);
        setElapsedTime(0);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const formatTime = (time) => {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        return `${hours.toString().padStart(2, '0')}:
            ${minutes.toString().padStart(2, '0')}:
            ${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <h1>Stopwatch</h1>
            <p>{formatTime(elapsedTime)}</p>
            {!isRunning ? (
                <button onClick={startTimer}>Start</button>
            ) : (
                <>
                    <button onClick={pauseTimer}>Pause</button>
                    <button onClick={stopTimer}>Stop</button>
                </>
            )}
        </div>
    );
};

export default Stopwatch;
