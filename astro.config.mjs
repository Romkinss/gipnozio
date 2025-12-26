import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Основные настройки
  integrations: [
    react({
      // Отключаем React для статических компонентов
      include: ['**/components/**/*.tsx', '**/components/**/*.jsx'],
    }),
    tailwind({
      // Tailwind конфиг
      configFile: './tailwind.config.mjs',
    }),
  ],
  
  // SSG - статическая генерация всех страниц
  output: 'static',
  
  // Сайт конфиг
  site: 'https://gipnozio.ru',
  trailingSlash: 'never',
  
  // Vite конфиг
  vite: {
    ssr: {
      external: ['lucide-react', '@supabase/supabase-js']
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['@supabase/supabase-js'],
          }
        }
      }
    }
  },
  
  // Оптимизация сборки
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
    assets: 'assets',
  },
  
  // Оптимизация изображений
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
    // Оптимизация размеров
    domains: ['gipnozio.ru', 'api.gipnozio.ru'],
  },
  
  // Кэширование
  cacheDir: './.astro',
  
  // Компиляция TypeScript
  compressHTML: true,
  
  // Prefetch конфиг
  prefetch: {
    prefetchAll: true,
  },
});
