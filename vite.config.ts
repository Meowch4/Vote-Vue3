import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5175',
      // '/api': {
      //   target: 'http://localhost:5175',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // },
      '/account': 'http://localhost:5175/',
      '/vote': 'http://localhost:5175/',
      '/realtime-voteinfo': {
        target: 'ws://localhost:5175',
        ws: true,
      },
      '/upload': 'http://localhost:5175/',
    },
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
