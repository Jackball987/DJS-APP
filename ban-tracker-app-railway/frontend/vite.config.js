import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

// Load .env variables
dotenv.config();

export default defineConfig(({ mode }) => {
  // Load env file based on mode (e.g. .env.production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173, // For local dev
      host: true,
    },
    preview: {
      port: 8080, // For Railway deployment
      host: true,
      allowedHosts: ['djs-app-production-front.up.railway.app'],
    },
    define: {
      'process.env': env,
    },
    build: {
      outDir: 'dist',
    },
  };
});


