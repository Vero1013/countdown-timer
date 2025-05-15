'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [target, setTarget] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!target) return;

    const interval = setInterval(() => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days:0, hours:0, minutes:0, seconds:0 });
        return;
      }
      const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#007acc' }}>🕒 Mini Countdown Timer</h1>

      <div style={{ margin: '1.5rem 0' }}>
        <input
          type="datetime-local"
          value={target}
          onChange={e => setTarget(e.target.value)}
          style={{ padding: '0.5rem', fontSize:'1rem' }}
        />
      </div>

      {timeLeft && (
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          {timeLeft.days} Days&nbsp;
          {timeLeft.hours} H&nbsp;
          {timeLeft.minutes} M&nbsp;
          {timeLeft.seconds} S
        </div>
      )}
    </main>
  );
}
