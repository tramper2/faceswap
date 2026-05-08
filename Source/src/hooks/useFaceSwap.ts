import { useState, useCallback } from 'react';

interface FaceSwapResult {
  image: string;
}

interface UseFaceSwapReturn {
  isLoading: boolean;
  error: string | null;
  result: string | null;
  swapFace: (sourceImage: string, targetImageUrl: string) => Promise<void>;
  reset: () => void;
}

export function useFaceSwap(apiUrl: string): UseFaceSwapReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const swapFace = useCallback(async (sourceImage: string, targetImageUrl: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceImage,
          targetImage: targetImageUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Face swap failed');
      }

      const data: FaceSwapResult = await response.json();
      setResult(data.image);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  const reset = useCallback(() => {
    setError(null);
    setResult(null);
  }, []);

  return {
    isLoading,
    error,
    result,
    swapFace,
    reset,
  };
}
