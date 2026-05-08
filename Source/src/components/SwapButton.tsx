interface SwapButtonProps {
  disabled: boolean;
  remaining: number;
  isLoading: boolean;
  onClick: () => void;
}

export function SwapButton({ disabled, remaining, isLoading, onClick }: SwapButtonProps) {
  const getButtonText = () => {
    if (remaining <= 0) return '오늘 사용 횟수를 모두 소진했습니다';
    if (isLoading) return '처리 중...';
    return 'Swap Face';
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <button
        onClick={onClick}
        disabled={disabled || remaining <= 0 || isLoading}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
          disabled || remaining <= 0
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-xl active:scale-95'
        }`}
      >
        {getButtonText()}
      </button>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        오늘 {remaining}회 남음
      </p>
    </div>
  );
}
