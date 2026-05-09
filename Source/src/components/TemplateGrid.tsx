import { useCallback } from 'react';

interface TemplateGridProps {
  selectedTemplate: number | null;
  onTemplateSelect: (index: number, url: string) => void;
  baseUrl: string;
}

const TEMPLATE_COUNT = 10;

export function TemplateGrid({ selectedTemplate, onTemplateSelect, baseUrl }: TemplateGridProps) {
  const getTemplateUrl = useCallback(
    (index: number) => `${baseUrl}/template_${String(index + 1).padStart(2, '0')}.jpg`,
    [baseUrl]
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Array.from({ length: TEMPLATE_COUNT }).map((_, index) => {
          const url = getTemplateUrl(index);
          const isSelected = selectedTemplate === index;

          return (
            <button
              key={index}
              onClick={() => onTemplateSelect(index, url)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 group ${
                isSelected
                  ? 'border-cyan-400 neon-box scale-105'
                  : 'border-purple-500/30 hover:border-cyan-400 hover:scale-105'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img
                src={url}
                alt={`Template ${index + 1}`}
                className="w-full h-full object-cover relative z-10"
                loading="lazy"
              />
              {isSelected && (
                <div className="absolute inset-0 bg-cyan-500/30 flex items-center justify-center z-20">
                  <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center neon-border">
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 z-10">
                <span className="text-cyan-400 text-xs font-mono">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
