import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Use a different base if deploying to a subfolder
  build: {
    outDir: 'dist', // Output directory for the build
    emptyOutDir: true, // Clean previous builds
  },
});
