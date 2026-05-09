import { useState, useCallback } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { TemplateGrid } from './components/TemplateGrid';
import { SwapButton } from './components/SwapButton';
import { ResultDisplay } from './components/ResultDisplay';
import { useRateLimit } from './hooks/useRateLimit';
import { useFaceSwap } from './hooks/useFaceSwap';

const TEMPLATE_BASE_URL = import.meta.env.DEV
  ? 'https://tramper2.github.io/faceswap/assets/templates'
  : `${import.meta.env.BASE_URL}assets/templates`;
const API_URL = import.meta.env.VITE_API_URL || '/api/faceswap/';

function App() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [targetImageUrl, setTargetImageUrl] = useState<string | null>(null);

  const { remaining, isLimited, resetCount } = useRateLimit();
  const { isLoading, error, result, swapFace, reset } = useFaceSwap(API_URL);

  const handleImageSelected = useCallback((base64: string) => {
    setSourceImage(base64);
    reset();
  }, [reset]);

  const handleTemplateSelect = useCallback((index: number, url: string) => {
    setSelectedTemplate(index);
    setTargetImageUrl(url);
    reset();
  }, [reset]);

  const handleSwap = useCallback(async () => {
    if (!sourceImage || !targetImageUrl) return;

    await swapFace(sourceImage, targetImageUrl);
    resetCount();
  }, [sourceImage, targetImageUrl, swapFace, resetCount]);

  const canSwap = Boolean(sourceImage && targetImageUrl && !isLimited);

  return (
    <div className="min-h-screen cyber-grid py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 neon-text relative z-10">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              FACE SWAP
            </span>
          </h1>
          <p className="text-cyan-300 text-xl neon-text-pink">
            당신의 얼굴을 사이버 템플릿에 합성하세요
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-10">
            <ImageUpload onImageSelected={handleImageSelected} />

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-cyan-400 neon-text">
                // 템플릿 선택
              </h2>
              <TemplateGrid
                selectedTemplate={selectedTemplate}
                onTemplateSelect={handleTemplateSelect}
                baseUrl={TEMPLATE_BASE_URL}
              />
            </div>
          </div>

          <div className="space-y-10">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 neon-box">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  // 결과물
                </h2>

                <ResultDisplay result={result} isLoading={isLoading} error={error} />

                {!result && !isLoading && !error && (
                  <div className="text-center py-16 border-2 border-dashed border-purple-500/30 rounded-xl">
                    <div className="text-6xl mb-4">⚡</div>
                    <p className="text-purple-300 text-lg">이미지와 템플릿을 선택하면</p>
                    <p className="text-cyan-300 text-lg">사이버 합성이 시작됩니다</p>
                  </div>
                )}
              </div>
            </div>

            {sourceImage && targetImageUrl && (
              <SwapButton
                disabled={!canSwap}
                remaining={remaining}
                isLoading={isLoading}
                onClick={handleSwap}
              />
            )}
          </div>
        </div>

        <footer className="mt-20 text-center relative">
          <div className="inline-block px-8 py-4 bg-black/50 backdrop-blur rounded-xl border border-cyan-500/30">
            <p className="text-cyan-400 text-sm mb-1">// Powered by Artractive</p>
            <p className="text-pink-400 text-xs">일일 3회 한정 • 변태스런 탐욕방지</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
