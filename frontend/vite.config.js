import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'API_URI'],
  server: {
    allowedHosts: ['secret-santa-frontend-4w4u.onrender.com']
  }
})
