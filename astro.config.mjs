import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
  site: 'https://gipnozio.ru',
  trailingSlash: 'never',
  vite: {
    ssr: {
      external: ['lucide-react']
    },
    build: {
      minify: 'terser',
    }
  },
  // Optimization settings
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
  },
});
