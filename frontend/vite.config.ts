import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        // Alle Aufrufe an /api/... gehen zum Backend
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/uploads': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
        }
    }
})