import path from 'node:path'

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'submithero-core',
      formats: ['es', 'cjs'],
      fileName: format => `submithero-core.${format}.js`,
    },
    rollupOptions: {
      external: [],
    },
  },
})
