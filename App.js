
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const CountdownTimer = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(2 * 60 * 60); // Initial time in seconds (2 hours)
  const [isRunning, setIsRunning] = useState(false);
  const customTimeRef = useRef(null);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (timeInSeconds > 0) {
          setTimeInSeconds((prevTime) => prevTime - 1);
        } else {
          stopTimer();
          alert('Time is up!');
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, timeInSeconds]);

  const updateTimerDisplay = () => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const pad = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const setCustomTime = () => {
    const customTimeArray = customTimeRef.current.value.split(':').map(Number);

    if (customTimeArray.length === 3) {
      const [hours, minutes, seconds] = customTimeArray;
      setTimeInSeconds(hours * 3600 + minutes * 60 + seconds);
    } else {
      alert('Please enter a valid time in HH:MM:SS format.');
    }
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  return (
    <div className="countdown-container">
      <div id="timer" className="timer-display">
        {updateTimerDisplay()}
      </div>
      <div id="controls" className="timer-controls">
        <label htmlFor="customTime">Edit Timer (HH:MM:SS): </label>
        <input type="text" id="customTime" ref={customTimeRef} placeholder="00:00:00" />
        <button onClick={setCustomTime}>Set Time</button>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
      </div>
    </div>
  );
};

export default CountdownTimer;

