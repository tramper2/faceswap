# Technical Design Document

## 1. Tech Stack
- **Frontend:** React.js (Vite) + TypeScript + Tailwind CSS
- **Deployment:** GitHub Pages
- **Proxy Server:** Vercel Functions (Node.js)
- **AI API:** Segmind Faceswap V5
- **Storage:** LocalStorage (Usage tracking)

## 2. API Architecture
- **Client (GitHub Pages)** -> **Proxy (Vercel)** -> **Segmind API**
- **Security:** `x-api-key`는 Vercel 환경 변수(`process.env.SEGMIND_API_KEY`)에 저장. GitHub Actions를 통해 배포 시 Secrets 주입.

## 3. Core Logic
- **Image Preprocessing:** 브라우저 Canvas API를 사용해 업로드 이미지를 1024px로 리사이징 및 Base64 인코딩
- **Rate Limiting:**
  - `localStorage.getItem('swap_count')` 확인
  - 날짜가 변경되었을 경우 카운트 초기화
  - 카운트 >= 10 일 경우 API 호출 차단

## 4. API Specification (Segmind Faceswap V5)
- **Endpoint:** `https://api.segmind.com/v1/faceswap-v5`
- **Method:** POST
- **Headers:**
  - `Content-Type: application/json`
  - `x-api-key: YOUR_API_KEY`
- **Payload:**
  ```json
  {
    "source_image": "base64_string",
    "target_image": "template_url",
    "image_format": "png",
    "quality": 95
  }
  ```
- **Response:**
  ```json
  {
    "image": "base64_encoded_result"
  }
  ```
