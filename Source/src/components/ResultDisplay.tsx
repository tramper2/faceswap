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
        <div className="relative aspect-square bg-black/80 rounded-2xl overflow-hidden border-2 border-purple-500/50 neon-box">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-cyan-400 text-lg font-semibold neon-text">합성 중...</p>
              <p className="text-purple-300 text-sm">AI가 작업하고 있습니다</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-red-500/20 border-2 border-red-500/50 rounded-2xl p-6 neon-box">
          <div className="text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="text-red-400 font-semibold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/50 neon-box">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-50"></div>
          <img
            src={`data:image/jpeg;base64,${result}`}
            alt="Face swap result"
            className="relative w-full"
          />
        </div>
        <button
          onClick={handleDownload}
          className="mt-6 w-full py-4 px-6 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 rounded-xl font-bold text-white flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 neon-box"
        >
          <Download className="w-6 h-6" />
          DOWNLOAD IMAGE
        </button>
      </div>
    );
  }

  return null;
}
