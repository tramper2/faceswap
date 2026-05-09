import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 배포를 위한 설정
// 리포지토리 이름이 'Faceswap'인 경우 base를 '/Faceswap/'으로 설정
export default defineConfig({
  plugins: [react()],
  base: '/faceswap/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://faceswap.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
