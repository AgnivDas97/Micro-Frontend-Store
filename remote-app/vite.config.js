import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: 'remote_app',
      filename: 'remoteEntry.js',
      // Modules exposed to Host
      exposes: {
        './CartPage': './src/components/CartPage.jsx',
        './cartSlice': './src/store/cartSlice.js',
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
    port: 5001,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: true,
  }
});