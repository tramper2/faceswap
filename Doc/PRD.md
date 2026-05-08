# Product Requirements Document: Face Swap Web App

## 1. Project Overview
사용자의 얼굴 사진을 업로드받아 미리 준비된 10개의 템플릿 중 하나를 선택하면, AI(Segmind API)를 이용해 얼굴을 합성해주는 웹 서비스.

## 2. Goals
- 사용자 친화적인 원클릭 페이스 스왑 경험 제공.
- GitHub Pages를 통한 무료 정적 호스팅.
- API 오남용 방지를 위한 일일 사용 제한(10회) 구현.

## 3. Key Features
- **이미지 업로드:** 드래그 앤 드롭 지원 및 이미지 리사이징(Client-side).
- **템플릿 선택:** 10개의 미리 정의된 고화질 이미지 그리드 제공.
- **AI 합성:** Segmind Faceswap V3 API 연동.
- **사용 제한:** 로컬 스토리지를 활용한 일일 10회 변환 제한.
- **결과물 처리:** 합성된 이미지 미리보기 및 다운로드 기능.

## 4. Constraints
- **Hosting:** GitHub Pages (Static Site).
- **Backend:** Serverless Functions (Vercel)를 통한 API Key 은닉.
- **Cost:** Segmind 무료 크레딧 범위 내 운영.