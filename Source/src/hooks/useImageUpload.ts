import { useState, useCallback } from 'react';
import { resizeAndEncodeImage } from '../utils/imageProcessor';

interface UploadedImage {
  base64: string;
  preview: string;
  file: File;
}

export function useImageUpload() {
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processImage = useCallback(async (file: File): Promise<string | null> => {
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return null;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('파일 크기는 10MB 이하여야 합니다.');
      return null;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const base64 = await resizeAndEncodeImage(file, 1024);
      const preview = URL.createObjectURL(file);

      setImage({ base64, preview, file });
      return base64;
    } catch (err) {
      setError(err instanceof Error ? err.message : '이미지 처리 중 오류가 발생했습니다.');
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const clearImage = useCallback(() => {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
    setImage(null);
    setError(null);
  }, [image?.preview]);

  return {
    image,
    isProcessing,
    error,
    processImage,
    clearImage,
  };
}
