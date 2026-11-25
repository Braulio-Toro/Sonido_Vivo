import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Frontend en http://localhost:5173  ->  API Spring Boot en http://localhost:8080 (ver .env)
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: './src/setupTests.js',
    include: ['src/tests/**/*.test.{js,jsx}'],
  },
});
