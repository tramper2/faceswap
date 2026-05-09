interface SwapButtonProps {
  disabled: boolean;
  remaining: number;
  isLoading: boolean;
  onClick: () => void;
}

export function SwapButton({ disabled, remaining, isLoading, onClick }: SwapButtonProps) {
  const getButtonText = () => {
    if (remaining <= 0) return '일일 한도 초과';
    if (isLoading) return '합성 중...';
    return 'FACE SWAP';
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <button
        onClick={onClick}
        disabled={disabled || remaining <= 0 || isLoading}
        className={`relative w-full py-5 px-8 rounded-xl font-bold text-lg transition-all duration-300 ${
          disabled || remaining <= 0
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
            : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white hover:scale-105 active:scale-95 neon-box'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-50 animate-pulse"></div>
        <span className="relative z-10 flex items-center justify-center gap-3">
          {isLoading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {getButtonText()}
        </span>
      </button>
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className={`w-2 h-2 rounded-full ${remaining > 0 ? 'bg-cyan-400 animate-pulse' : 'bg-red-500'}`}></div>
        <p className={`font-mono ${remaining > 0 ? 'text-cyan-400' : 'text-red-400'}`}>
          오늘 <span className="font-bold">{remaining}</span>회 남음
        </p>
      </div>
    </div>
  );
}
