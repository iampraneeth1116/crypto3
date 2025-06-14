import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    historyApiFallback: true,
    middleware: (app) => {
      app.use((req, res, next) => {
        if (!req.url.includes('.')) {
          req.url = '/index.html'
        }
        next()
      })
    }
  },
})
