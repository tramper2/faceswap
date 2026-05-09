# Face Swap Web App

AI 기반 얼굴 합성 웹 애플리케이션입니다. 사용자의 얼굴 사진을 업로드하면 Segmind AI API를 사용하여 10개의 템플릿 중 하나와 합성해줍니다.

## 기술 스택

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (정적 사이트)
- **API Proxy**: Vercel Functions (API Key 보호)
- **AI API**: Segmind Faceswap V5

## 시작하기

### 1. 의존성 설치

```bash
cd Source
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 API URL을 설정합니다:

```bash
cp .env.example .env
```

개발 환경에서는 Vite 프록시를 사용할 수 있습니다 (`/api/faceswap`).

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 빌드

```bash
npm run build
```

## 배포 설정

### Vercel (API Functions)

1. Vercel 프로젝트 생성
2. 환경 변수 설정:
   - `SEGMIND_API_KEY`: Segmind API 키 (발급: https://www.segmind.com/)
3. GitHub Secrets 설정:
   - `VERCEL_TOKEN`: Vercel 토큰
   - `VERCEL_ORG_ID`: Vercel 조직 ID
   - `VERCEL_PROJECT_ID`: Vercel 프로젝트 ID

### GitHub Pages

main 브랜치에 푸시하면 자동으로 배포됩니다.

### URLs

- **GitHub Pages**: https://tramper2.github.io/faceswap/
- **Vercel API**: https://faceswap-six.vercel.app/api/faceswap/

## 프로젝트 구조

```
Source/
├── src/
│   ├── components/           # React 컴포넌트
│   │   ├── ImageUpload.tsx   # 드래그앤드롭 업로드
│   │   ├── TemplateGrid.tsx  # 10개 템플릿 그리드
│   │   ├── SwapButton.tsx    # 실행 버튼 (횟수 표시)
│   │   └── ResultDisplay.tsx # 결과 미리보기/다운로드
│   ├── hooks/                # Custom Hooks
│   │   ├── useImageUpload.ts # 이미지 업로드 & 리사이징
│   │   ├── useRateLimit.ts   # 일일 3회 제한
│   │   └── useFaceSwap.ts    # API 호출
│   ├── utils/
│   │   └── imageProcessor.ts # Canvas API 유틸리티
│   ├── App.tsx               # 메인 컴포넌트
│   └── main.tsx              # Entry point
├── api/
│   └── faceswap.js           # Vercel Function 프록시
├── public/
│   └── assets/
│       └── templates/        # 템플릿 이미지 (template_01.jpg ~ template_10.jpg)
├── vite.config.ts            # Vite 설정
├── vercel.json               # Vercel Functions 라우팅
├── tailwind.config.js        # Tailwind 설정
└── package.json
```

## API 스펙 (Segmind Faceswap V5)

### 엔드포인트
```
POST https://api.segmind.com/v1/faceswap-v5
```

### 요청
```json
{
  "source_image": "base64_encoded_user_image",
  "target_image": "template_url",
  "image_format": "png",
  "quality": 95
}
```

### 응답
```json
{
  "image": "base64_encoded_result"
}
```

## 사용 제한

- **일일 3회 이용 가능** (유료 API 남용 방지)
- localStorage에 저장되어 브라우저마다 별도 관리

## 참고 자료

- [Segmind Faceswap V5 API 문서](https://www.segmind.com/models/faceswap-v5/api)
- [Segmind API 키 발급](https://www.segmind.com/)

## 라이선스

MIT
