import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '127.0.0.1', // Явное указание localhost
    port: 3000,
    strictPort: true,
    open: false, // Отключить автоматическое открытие
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1'
    }
  },
  preview: {
    port: 3000,
    strictPort: true
  }
});