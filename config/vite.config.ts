import { defineConfig, mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async ({ mode }) => {
  const config = await import(`./vite.config.${mode}.ts`);

  const defaults = defineConfig({
    plugins: [react()],
    build: {
      outDir: 'build',
      cssCodeSplit: true,
      emptyOutDir: true,
    },
  });

  return mergeConfig(defaults, config.default);
});
