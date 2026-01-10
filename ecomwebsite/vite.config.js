import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // <--- Check this import

export default defineConfig({
  plugins: [
    react(), 
    svgr(), // <--- Check this function call
  ],
  server: {
    port: 3000,
    open: true,
  },
});