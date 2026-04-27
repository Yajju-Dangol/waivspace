import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    sitemap({
      hostname: 'https://waiv.space',
      dynamicRoutes: ['/']
    })
  ],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'vendor-three';
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('remotion') || id.includes('@remotion')) return 'vendor-remotion';
            if (id.includes('@google/generative-ai')) return 'vendor-google-ai';
            if (id.includes('lucide-react')) return 'vendor-icons';
            return 'vendor'; // all other dependencies
          }
        },
      },
    },
  },
})
