## 1. Entry Point
- 사용자가 GitHub Pages URL 접속.

## 2. Image Upload
- [Upload] 버튼 클릭 또는 이미지 드래그.
- 이미지 로딩 후 브라우저 내 미리보기 표시.

## 3. Template Selection
- 하단 10개의 템플릿 이미지 그리드 중 하나 클릭.
- 선택된 템플릿에 강조 표시.

## 4. Execution
- [Swap Face] 버튼 활성화 (남은 횟수 표시: "오늘 8회 남음").
- 클릭 시 로딩 애니메이션(스켈레톤 UI) 노출.
- Vercel Proxy를 거쳐 Segmind API 호출.

## 5. Result & Download
- 합성 완료된 이미지가 중앙에 표시.
- [Download Image] 버튼 클릭으로 로컬 저장.
- 오늘 남은 횟수 UI 업데이트 (-1).