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
    <div className="w-full max-w-md mx-auto">
      {!image ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              이미지를 드래그하거나 클릭하여 업로드
            </p>
            <p className="text-sm text-gray-500">JPG, PNG (최대 10MB)</p>
          </label>
        </div>
      ) : (
        <div className="relative">
          <img
            src={image.preview}
            alt="Uploaded"
            className="w-full rounded-lg shadow-lg"
          />
          <button
            onClick={handleClear}
            className="mt-4 w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            변경하기
          </button>
        </div>
      )}

      {isProcessing && (
        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
          처리 중...
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
