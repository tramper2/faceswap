import { useState, useEffect, useCallback } from 'react';

const DAILY_LIMIT = 10;
const STORAGE_KEY = 'swap_count';
const DATE_KEY = 'swap_date';

interface RateLimitState {
  remaining: number;
  isLimited: boolean;
  resetCount: () => void;
}

export function useRateLimit(): RateLimitState {
  const [remaining, setRemaining] = useState<number>(DAILY_LIMIT);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(DATE_KEY);

    if (storedDate !== today) {
      localStorage.setItem(DATE_KEY, today);
      localStorage.setItem(STORAGE_KEY, '0');
      setRemaining(DAILY_LIMIT);
    } else {
      const count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      setRemaining(Math.max(0, DAILY_LIMIT - count));
    }
  }, []);

  const resetCount = useCallback(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(DATE_KEY);

    if (storedDate !== today) {
      localStorage.setItem(DATE_KEY, today);
      localStorage.setItem(STORAGE_KEY, '0');
      setRemaining(DAILY_LIMIT);
      return;
    }

    const currentCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    const newCount = currentCount + 1;
    localStorage.setItem(STORAGE_KEY, newCount.toString());
    setRemaining(Math.max(0, DAILY_LIMIT - newCount));
  }, []);

  return {
    remaining,
    isLimited: remaining <= 0,
    resetCount,
  };
}
