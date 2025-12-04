import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forward /api requests to backend running on port 3000
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // remove prefix /api if your backend doesn't expect it, otherwise keep
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
