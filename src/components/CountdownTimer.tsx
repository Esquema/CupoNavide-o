import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const totalSeconds = Math.max((targetDate.getTime() - now.getTime()) / 1000, 0);

      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      // Detener el temporizador cuando llegue a 0
      if (totalSeconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown" aria-label="Countdown Timer">
      <div className="countdown-item">
        <span className="countdown-value" aria-label={`${timeLeft.days} days`}>
          {timeLeft.days}
        </span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value" aria-label={`${timeLeft.hours} hours`}>
          {timeLeft.hours}
        </span>
        <span className="countdown-label">Hours</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value" aria-label={`${timeLeft.minutes} minutes`}>
          {timeLeft.minutes}
        </span>
        <span className="countdown-label">Minutes</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value" aria-label={`${timeLeft.seconds} seconds`}>
          {timeLeft.seconds}
        </span>
        <span className="countdown-label">Seconds</span>
      </div>
    </div>
  );
}


