import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  build: {
    outDir: path.join(__dirname, 'build'),
  },
  resolve: {
    alias: {
      ROOT: path.resolve(__dirname),
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src', 'api'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@constants': path.resolve(__dirname, 'src', 'data', 'constants'),
      '@css': path.resolve(__dirname, 'src', 'assets', 'css'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
      '@icons': path.resolve(__dirname, 'src', 'assets', 'icons'),
      '@images': path.resolve(__dirname, 'src', 'assets', 'images'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@contexts': path.resolve(__dirname, 'src', 'contexts'),
      '@data': path.resolve(__dirname, 'src', 'data'),
      '@layouts': path.resolve(__dirname, 'src', 'layouts'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@plugins': path.resolve(__dirname, 'src', 'plugins'),
      '@reducers': path.resolve(__dirname, 'src', 'data', 'reducers'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
      '@@types': path.resolve(__dirname, 'src', '@types'),
    },
  },
  plugins: [
    react({
      // Hot Reload
      include: '**/*.tsx',
    }),
  ],
});
