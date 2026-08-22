import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: 'auth_app',
      filename: 'remoteEntry.js',
      exposes: {
        './LoginPage': './src/components/LoginPage.jsx',
        './UserProfileModal': './src/components/UserProfileModal.jsx',
        './authSlice': './src/store/authSlice.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5002,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 5002,
    strictPort: true,
    cors: true,
  }
});
