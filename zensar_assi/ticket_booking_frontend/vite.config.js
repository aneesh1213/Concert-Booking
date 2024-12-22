import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer/'
    }
  },
  define: {
    'process.env': {},
    global: {},
  },
  optimizeDeps: {
    include: ['buffer']
  }
})