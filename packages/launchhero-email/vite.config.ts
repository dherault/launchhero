import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'startupjournal-email',
      formats: ['es', 'cjs'],
      fileName: format => `startupjournal-email.${format}.js`,
    },
    rollupOptions: {
      external: [],
    },
  },
})
