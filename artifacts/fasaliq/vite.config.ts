import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';


const rawPort = process.env.PORT ?? '5173';

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
    proxy: {
      '/api/gemini': {
        target: process.env.API_SERVER_URL ?? 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      // Proxy Google OAuth token endpoint (bypasses CORS for service account JWT)
      '/api/google-oauth': {
        target: 'https://oauth2.googleapis.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/google-oauth/, ''),
        secure: true,
      },
      // Proxy Vertex AI Gemini endpoint (bypasses CORS)
      '/api/vertex-ai': {
        target: 'https://us-central1-aiplatform.googleapis.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/vertex-ai/, ''),
        secure: true,
      },
      // Proxy Google Cloud Vision API endpoint
      '/api/google-vision': {
        target: 'https://vision.googleapis.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/google-vision/, ''),
        secure: true,
      },
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});

