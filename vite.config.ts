import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Raster images (jpg/png) are already resized + compressed once, at high
    // quality, by scripts/optimize-images.mjs — so we do NOT re-compress them
    // here (double compression was degrading quality). This plugin only tidies
    // up SVGs via svgo.
    ViteImageOptimizer({
      test: /\.svg$/i,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1500,
    assetsInlineLimit: 4096,
    cssMinify: true,
  },
})
