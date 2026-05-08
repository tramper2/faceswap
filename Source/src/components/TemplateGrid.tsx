import { useCallback } from 'react';

interface TemplateGridProps {
  selectedTemplate: number | null;
  onTemplateSelect: (index: number, url: string) => void;
  baseUrl: string;
}

const TEMPLATE_COUNT = 10;

export function TemplateGrid({ selectedTemplate, onTemplateSelect, baseUrl }: TemplateGridProps) {
  const getTemplateUrl = useCallback(
    (index: number) => `${baseUrl}/template_${String(index + 1).padStart(2, '0')}.webp`,
    [baseUrl]
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
        템플릿 선택
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Array.from({ length: TEMPLATE_COUNT }).map((_, index) => {
          const url = getTemplateUrl(index);
          const isSelected = selectedTemplate === index;

          return (
            <button
              key={index}
              onClick={() => onTemplateSelect(index, url)}
              className={`relative aspect-square rounded-lg overflow-hidden border-4 transition-all ${
                isSelected
                  ? 'border-purple-500 shadow-lg scale-105'
                  : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <img
                src={url}
                alt={`Template ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {isSelected && (
                <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
