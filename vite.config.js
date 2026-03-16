import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/sahara-problem/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2019',
    minify: false,
  },
})