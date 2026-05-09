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
      // 개발 환경에서는 Segmind API 직접 호출
      const isDev = import.meta.env.DEV;
      const url = isDev ? 'https://api.segmind.com/v1/faceswap-v5' : apiUrl;

      const body = {
        source_image: sourceImage,
        target_image: targetImageUrl,
        image_format: 'png',
        quality: 95,
      };

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // 개발 환경에서만 API 키 추가
      if (isDev && import.meta.env.VITE_SEGMIND_API_KEY) {
        headers['x-api-key'] = import.meta.env.VITE_SEGMIND_API_KEY;
      }

      console.log('API Request:', { url, body });

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      console.log('API Response status:', response.status);
      console.log('API Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Segmind API error (${response.status}): ${errorText}`);
      }

      // 응답 처리
      const contentType = response.headers.get('content-type') || '';
      let image: string;

      if (contentType.includes('application/json')) {
        const data: FaceSwapResult = await response.json();
        image = data.image;
      } else {
        // 이미지를 blob으로 받아서 base64 변환
        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();

        // 간단한 base64 인코딩
        const uint8Array = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < uint8Array.length; i++) {
          binary += String.fromCharCode(uint8Array[i]);
        }
        image = btoa(binary);
      }

      console.log('Image length:', image.length);
      setResult(image);
    } catch (err) {
      console.error('Swap error:', err);
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
