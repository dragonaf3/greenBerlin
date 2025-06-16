import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
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