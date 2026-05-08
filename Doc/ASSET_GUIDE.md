# Asset Generation Guide

## 1. Template Images
- **Count:** 10 Images.
- **Storage Path:** `/public/assets/templates/`
- **Format:** `.webp` (Recommended for performance).
- **Naming Convention:** `template_01.webp` ~ `template_10.webp`.
- **Search Query Guide (for Dev):**
  - "High quality cinematic portrait, front facing face, clear features"
  - "Historical figure portrait, oil painting style"
  - "Cyberpunk character, high detail face"

## 2. UI Icons
- **Upload Icon:** Lucide-react `Upload` icon.
- **Download Icon:** Lucide-react `Download` icon.
- **Loading Spinner:** Tailwind CSS animate-spin.

## 3. GitHub Actions Config
- `.github/workflows/deploy.yml` 파일 생성 필요.
- 배포 시 `Vercel CLI` 연동하여 `SEGMIND_API_KEY` 환경변수 동기화 설정.