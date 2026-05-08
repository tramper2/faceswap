export async function resizeAndEncodeImage(
  file: File,
  maxSize: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      let { width, height } = img;

      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const base64 = canvas.toDataURL('image/jpeg', 0.9);
      const base64Data = base64.split(',')[1];

      resolve(base64Data);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

export function downloadImage(base64: string, filename: string = 'faceswap-result.jpg') {
  const link = document.createElement('a');
  link.href = `data:image/jpeg;base64,${base64}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
