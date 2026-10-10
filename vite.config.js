import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Vite 8 uses Oxc minifier by default (esbuild removed as bundled dep)
    cssMinify: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // PERF FIX: manualChunks as a function (required by Vite 8 / Rolldown).
        // Separates vendor libs so browsers can cache them independently
        // between deployments — only changed chunks are re-downloaded.
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'motion';
          }
          if (id.includes('node_modules/react-icons')) {
            return 'icons';
          }
          if (id.includes('node_modules/@emailjs')) {
            return 'emailjs';
          }
          if (id.includes('node_modules/react-type-animation')) {
            return 'type-anim';
          }
        },
      },
    },
    // Target modern browsers — enables smaller output (no legacy polyfills)
    target: 'es2020',
  },
})
