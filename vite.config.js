import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/retro-polaroid-gemini3pro/', // 这里必须必须必须改成你的 GitHub 仓库名，例如 '/my-camera-app/'
})

