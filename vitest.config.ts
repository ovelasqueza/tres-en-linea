/// <reference types="vitest" />
import {
  defineConfig,
  configDefaults,
  coverageConfigDefaults,
} from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, 'e2e/*', '**config**', '**/build/**'],
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**config**',
        '**/build/**',
        'src/main.tsx',
        'src/setupTests.ts',
      ],
    },
  },
});
