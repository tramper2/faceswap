import { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useImageUpload } from '../hooks/useImageUpload';

interface ImageUploadProps {
  onImageSelected: (base64: string) => void;
}

export function ImageUpload({ onImageSelected }: ImageUploadProps) {
  const { image, isProcessing, error, processImage, clearImage } = useImageUpload();

  const handleFileSelect = useCallback(
    async (file: File) => {
      await processImage(file);
      if (image?.base64) {
        onImageSelected(image.base64);
      }
    },
    [processImage, image?.base64, onImageSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleClear = useCallback(() => {
    clearImage();
  }, [clearImage]);

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      {!image ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-10 text-center border-2 border-dashed border-cyan-500/50 hover:border-cyan-400 hover:neon-box transition-all duration-300 cursor-pointer group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer relative z-10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-10 h-10 text-cyan-400" />
            </div>
            <p className="text-cyan-300 text-lg mb-2 font-semibold">
              이미지를 드래그하거나 클릭하여 업로드
            </p>
            <p className="text-sm text-purple-400">JPG, PNG (최대 10MB)</p>
          </label>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-50"></div>
          <img
            src={image.preview}
            alt="Uploaded"
            className="relative w-full rounded-2xl shadow-2xl border-2 border-cyan-500/50"
          />
          <button
            onClick={handleClear}
            className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-semibold transition-all duration-300 neon-border-pink"
          >
            변경하기
          </button>
        </div>
      )}

      {isProcessing && (
        <div className="mt-4 text-center text-cyan-400 font-semibold">
          <div className="inline-flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            처리 중...
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-400 bg-red-500/20 border border-red-500/50 p-4 rounded-xl neon-box">
          <span className="font-semibold">{error}</span>
        </div>
      )}
    </div>
  );
}
