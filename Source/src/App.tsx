import { useState, useCallback } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { TemplateGrid } from './components/TemplateGrid';
import { SwapButton } from './components/SwapButton';
import { ResultDisplay } from './components/ResultDisplay';
import { useRateLimit } from './hooks/useRateLimit';
import { useFaceSwap } from './hooks/useFaceSwap';

const TEMPLATE_BASE_URL = '/assets/templates';
const API_URL = import.meta.env.VITE_API_URL || '/api/faceswap';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Face Swap
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            당신의 얼굴을 다양한 템플릿에 합성해보세요
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <ImageUpload onImageSelected={handleImageSelected} />

            {sourceImage && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
                  합성할 템플릿을 선택하세요
                </h2>
                <TemplateGrid
                  selectedTemplate={selectedTemplate}
                  onTemplateSelect={handleTemplateSelect}
                  baseUrl={TEMPLATE_BASE_URL}
                />
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                결과물
              </h2>

              <ResultDisplay result={result} isLoading={isLoading} error={error} />

              {!result && !isLoading && !error && (
                <div className="text-center py-12 text-gray-400">
                  <p>이미지와 템플릿을 선택하면</p>
                  <p>여기에 결과물이 표시됩니다</p>
                </div>
              )}
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

        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Powered by Segmind AI • 일일 10회 무료 이용 가능</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
