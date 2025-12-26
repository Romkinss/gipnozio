import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
  site: 'https://gipnozio.ru',
  vite: {
    ssr: {
      external: ['lucide-react']
    }
  },
  // Content Collections configuration
  content: {
    collections: {
      blog: {
        schema: ({ image }) => ({
          type: 'content',
          fields: {
            title: { type: 'string' },
            description: { type: 'string' },
            publishedAt: { type: 'date' },
            category: { type: 'string', required: false },
            tags: { type: 'array', required: false },
            featuredImage: { type: 'image', required: false },
          }
        })
      },
      lessons: {
        schema: ({ image }) => ({
          type: 'content',
          fields: {
            title: { type: 'string' },
            description: { type: 'string' },
            duration: { type: 'string' },
            level: { type: 'string', required: false },
            order: { type: 'number' },
            module: { type: 'string', required: false },
          }
        })
      }
    }
  }
});
