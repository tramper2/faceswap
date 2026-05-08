# 배포 가이드

이 문서는 Face Swap Web App을 배포하는 절차를 안내합니다.

---

## 1. Segmind API 키 발급

1. [Segmind](https://www.segmind.com/) 회원가입/로그인
2. [API Keys 페이지](https://www.segmind.com/keys)에서 키 발급
3. 발급된 키를 복사해둠

---

## 2. Vercel 프로젝트 설정

### 2.1 Vercel 프로젝트 생성

1. [Vercel](https://vercel.com) 접속 → **Add New Project**
2. Git 리포지토리 연동 (GitHub)
3. **Root Directory**: `Source`
4. **Framework Preset**: Vite
5. **Deploy** 클릭

### 2.2 환경 변수 설정

1. 배포된 프로젝트 → **Settings** → **Environment Variables**
2. 다음 변수 추가:

| Key | Value | Environment |
|-----|-------|-------------|
| `SEGMIND_API_KEY` | 발급받은 API 키 | Production, Preview, Development |

3. **Save** 클릭

### 2.3 프로젝트 ID 확인

터미널에서 다음 명령어 실행:

```bash
cd /home/tramp/projects/Faceswap/Source
npx vercel link
```

생성된 `.vercel/project.json` 파일에서 확인:
- `orgId`: **VERCEL_ORG_ID**
- `projectId`: **VERCEL_PROJECT_ID**

---

## 3. GitHub Secrets 설정

1. GitHub 리포지토리 → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** 클릭 후 다음 추가:

| Secret Name | 값 |
|-------------|-----|
| `VERCEL_TOKEN` | [token.vercel.com](https://token.vercel.com)에서 발급된 토큰 |
| `VERCEL_ORG_ID` | 위에서 확인한 조직 ID |
| `VERCEL_PROJECT_ID` | 위에서 확인한 프로젝트 ID |

---

## 4. 템플릿 이미지 준비

`Source/public/assets/templates/` 폴더에 10개의 템플릿 이미지 배치:

```
template_01.webp
template_02.webp
...
template_10.webp
```

이미지 요구사항:
- 형식: WebP (권장) 또는 JPG/PNG
- 크기: 권장 1024x1024 이상
- 내용: 얼굴이 명확하게 보이는 고화질 이미지

---

## 5. 배포 실행

### 자동 배포 (GitHub Actions)

main 브랜치에 푸시하면 자동으로 배포됩니다:

```bash
git add .
git commit -m "Deploy face swap app"
git push origin main
```

### 수동 배포

```bash
cd Source
npm run build
npx vercel --prod
```

---

## 6. 배포 확인

### Vercel Function 확인
```
https://your-project.vercel.app/api/faceswap
```

### GitHub Pages 확인
```
https://your-username.github.io/Faceswap/
```

---

## 7. 문제 해결

### API 키 오류
- Vercel 환경 변수가 제대로 설정되었는지 확인
- 재배포를 통해 환경 변수가 적용되었는지 확인

### CORS 오류
- Vercel Function이 정상적으로 배포되었는지 확인
- API URL이 올바른지 확인

### 템플릿 이미지 로드 실패
- 이미지 파일명이 `template_01.webp` ~ `template_10.webp` 형식인지 확인
- 파일이 `Source/public/assets/templates/` 폴더에 있는지 확인

---

## 참고 링크

- [Segmind Faceswap V5 API](https://www.segmind.com/models/faceswap-v5/api)
- [Vercel 문서](https://vercel.com/docs)
- [GitHub Pages 문서](https://docs.github.com/en/pages)
