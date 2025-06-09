import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  base: './',
  resolve: {
    alias: [
      { find: '~', replacement: '/src' },
      { find: 'global', replacement: 'globalthis' },
      { find: 'crypto', replacement: 'sockjs-client/lib/utils/browser-crypto.js' }
    ],
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // Định nghĩa `global` thành `globalThis`
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:8080',
        // target: 'https://auctionsession-e9b7beg0gvf2dhax.southeastasia-01.azurewebsites.net',
        target: 'https://onlineauctionweb-fud5a8hnd4cbckgf.southeastasia-01.azurewebsites.net/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
