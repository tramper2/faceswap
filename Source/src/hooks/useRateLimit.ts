import { useState, useEffect, useCallback } from 'react';

const DAILY_LIMIT = 3;
const STORAGE_KEY = 'swap_count';
const DATE_KEY = 'swap_date';

// 개발 모드에서 제한 해제 (VITE_RATE_LIMIT=false)
const ENABLE_RATE_LIMIT = import.meta.env.VITE_RATE_LIMIT !== 'false';

interface RateLimitState {
  remaining: number;
  isLimited: boolean;
  resetCount: () => void;
}

export function useRateLimit(): RateLimitState {
  const [remaining, setRemaining] = useState<number>(ENABLE_RATE_LIMIT ? DAILY_LIMIT : 999);

  useEffect(() => {
    if (!ENABLE_RATE_LIMIT) {
      return;
    }

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
    if (!ENABLE_RATE_LIMIT) {
      return;
    }

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
    remaining: ENABLE_RATE_LIMIT ? remaining : 999,
    isLimited: ENABLE_RATE_LIMIT ? remaining <= 0 : false,
    resetCount,
  };
}
