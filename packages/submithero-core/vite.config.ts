import path from 'node:path'

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'startupjournal-core',
      formats: ['es', 'cjs'],
      fileName: format => `startupjournal-core.${format}.js`,
    },
    rollupOptions: {
      external: [],
    },
  },
})
