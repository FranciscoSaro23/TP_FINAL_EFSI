import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  const isVercel = !!process.env.VERCEL
  return {
    plugins: [react()],
    // En Vercel el sitio vive en la raíz -> '/'
    // En GitHub Pages (repo TP_FINAL_EFSI) el sitio vive en '/TP_FINAL_EFSI/'
    base: isVercel ? '/' : '/TP_FINAL_EFSI/'
  }
})
