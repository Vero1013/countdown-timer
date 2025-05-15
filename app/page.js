// app/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [target, setTarget] = useState("");
  const [remaining, setRemaining] = useState("");
  const [endMessage, setEndMessage] = useState("Time's up!");
  const alerted = useRef(false);

  useEffect(() => {
    if (!target) return;
    const interval = setInterval(() => {
      const diff = new Date(target) - Date.now();
      if (diff <= 0) {
        setRemaining(endMessage);
        if (!alerted.current) {
          alerted.current = true;
          alert(endMessage);
        }
        clearInterval(interval);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setRemaining(`${d}d ${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [target, endMessage]);

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>⏳ Mini Countdown Timer</h1>
        <input
          type="datetime-local"
          onChange={(e) => setTarget(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="End message"
          value={endMessage}
          onChange={(e) => setEndMessage(e.target.value)}
          className={styles.input}
        />
        <button
          onClick={() => {
            alerted.current = false;
          }}
          className={styles.button}
        >
          Start
        </button>
        <div className={styles.remaining}>
          {remaining || "Pick a date/time above"}
        </div>
      </div>
    </main>
  );
}
