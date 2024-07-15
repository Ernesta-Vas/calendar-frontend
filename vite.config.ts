import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/calendar-frontend/',
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  server: {
    host: true,
    port: 3001 
  },
  preview: {
    port: 3001 
  }
})