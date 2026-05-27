import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: "./dist/app",
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': resolve(__dirname, './src/styles')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/dev': {
        rewrite(path) {
          return path.replace('/dev', '')
        },
        changeOrigin: true,
        target: 'http://localhost:3001/',
        localAddress: ''
      }
    }
  }
})
