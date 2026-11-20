import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const connectionPath = process.env.FLOWGRAM_CONNECTION_FILE || fileURLToPath(new URL('../../.flowgram-local/connection.json', import.meta.url));
function connection(): { endpoint: string; token: string } {
  return JSON.parse(readFileSync(connectionPath, 'utf8'));
}
export default defineConfig(({ command, mode }) => ({
  plugins: [react(), tailwindcss()],
  // Builds and unit tests run without a backend or its private connection file.
  server: command === 'serve' && mode !== 'test' ? {
    host: '127.0.0.1', port: 1420, strictPort: true,
    proxy: {
      '/v1': { target: connection().endpoint },
      '/api': {
        target: connection().endpoint,
        configure(proxy) {
          proxy.on('proxyReq', (request) => {
            try { request.setHeader('Authorization', `Bearer ${connection().token}`); } catch { /* Backend reports a connection error. */ }
          });
        },
      },
    },
  } : undefined,
  resolve: { dedupe: ['react', 'react-dom'] },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Keep shared runtimes out of the workbench entry and lazy canvas chunk.
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
          'vendor-markdown': ['react-markdown', 'remark-gfm'],
        },
      },
    },
  },
}));
