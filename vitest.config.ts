import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.ts'],
    coverage: {
      exclude: [
        '*/main.tsx',
        './src/tests/setupTests.ts',
        './src/interfaces/',
        '**/*.d.ts',
        '*.cjs',
        '*.config.ts',
        'node_modules/**',
      ],
    },
  },
});
