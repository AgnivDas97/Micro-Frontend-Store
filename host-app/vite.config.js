import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: 'host_app',
      remotes: {
        remoteApp: process.env.VITE_REMOTE_APP_URL || 'http://localhost:5001/assets/remoteEntry.js',
        authApp: process.env.VITE_AUTH_APP_URL || 'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux'],
    }),
  ],
  build: {
    target: 'esnext',
  },
  server: {
    port: 5000,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 5000,
    strictPort: true,
    cors: true,
  }
});