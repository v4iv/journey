import path from 'path'
import {defineConfig} from 'vite'
import {VitePWA} from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'
import {VitePluginRadar} from 'vite-plugin-radar'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: process.env.VITE_GTAG,
      },
    }),
    VitePWA({
      includeAssets: [
        'splash.png',
        'favicon.ico',
        'apple-touch-icon.png',
        'icon-192-maskable.png',
      ],
      manifest: {
        name: 'Journey',
        short_name: 'Journey',
        description: 'Begin your journey...',
        theme_color: '#020817',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icon-192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
