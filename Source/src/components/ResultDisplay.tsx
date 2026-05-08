import { useCallback } from 'react';
import { Download } from 'lucide-react';
import { downloadImage } from '../utils/imageProcessor';

interface ResultDisplayProps {
  result: string | null;
  isLoading: boolean;
  error: string | null;
}

export function ResultDisplay({ result, isLoading, error }: ResultDisplayProps) {
  const handleDownload = useCallback(() => {
    if (result) {
      downloadImage(result);
    }
  }, [result]);

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg aspect-square w-full"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">얼굴 합성 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="rounded-lg overflow-hidden shadow-xl">
          <img
            src={`data:image/jpeg;base64,${result}`}
            alt="Face swap result"
            className="w-full"
          />
        </div>
        <button
          onClick={handleDownload}
          className="mt-4 w-full py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download Image
        </button>
      </div>
    );
  }

  return null;
}
