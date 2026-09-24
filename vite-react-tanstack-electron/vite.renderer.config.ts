import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: './',
  plugins: [
    react(),
    {
      name: 'renderer-csp',
      transformIndexHtml: () => {
        const development = command === 'serve';
        return [
          {
            tag: 'meta',
            attrs: {
              'http-equiv': 'Content-Security-Policy',
              content: [
                "default-src 'self'",
                `script-src 'self'${development ? " 'unsafe-inline'" : ''}`,
                "style-src 'self' 'unsafe-inline'",
                `connect-src 'self'${development ? ' ws://localhost:*' : ''}`,
                "object-src 'none'",
                "base-uri 'none'",
              ].join('; '),
            },
            injectTo: 'head-prepend',
          },
        ];
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
}));
