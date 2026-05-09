# Asset Generation Guide

## 1. Template Images
- **Count:** 10 Images
- **Storage Path:** `Source/public/assets/templates/`
- **Format:** `.jpg` (현재 사용 중, WebP로 변환 권장)
- **Naming Convention:** `template_01.jpg` ~ `template_10.jpg`

### 현재 템플릿 목록
1. template_01.jpg (135KB)
2. template_02.jpg (150KB)
3. template_03.jpg (7KB)
4. template_04.jpg (355KB)
5. template_05.jpg (582KB)
6. template_06.jpg (141KB)
7. template_07.jpg (99KB)
8. template_08.jpg (296KB)
9. template_09.jpg (419KB)
10. template_10.jpg (415KB)

## 2. UI Icons
- **Upload Icon:** Lucide-react `Upload` icon
- **Download Icon:** Lucide-react `Download` icon
- **Loading Spinner:** Tailwind CSS animate-spin

## 3. 템플릿 추가/변경 방법
이미지를 `Source/public/assets/templates/` 폴더에 넣고 `template_XX.jpg` 형식으로 이름 변경:
```bash
mv your-image.jpg Source/public/assets/templates/template_11.jpg
```

## 4. WebP 변환 (선택사항, 권장)
더 작은 파일 크기를 위해 WebP로 변환:
```bash
# ImageMagick 또는 cwebp 사용
cwebp template_01.jpg -o template_01.webp
```
