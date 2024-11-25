import React, { useState, useEffect } from 'react';

type CountdownProps = {
  targetDate: Date;
};

const CountdownTimer: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();
    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3 text-center text-white bg-[#4A90E2] p-5 rounded-sm">
      <div>
        <h1>{String(timeLeft.days).padStart(2, '0')}</h1>
        <span>DAYS</span>
      </div>
      <div>
        <h1>{String(timeLeft.hours).padStart(2, '0')}</h1>
        <span>HOURS</span>
      </div>
      <div>
        <h1>{String(timeLeft.minutes).padStart(2, '0')}</h1>
        <span>MINS</span>
      </div>
      <div>
        <h1>{String(timeLeft.seconds).padStart(2, '0')}</h1>
        <span>SECS</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
