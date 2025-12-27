
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

// Конфигурация
const DOMAIN = 'https://gipnozio.ru';
const SUPABASE_URL = 'https://nsyhujqhmizqnwrdozrn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zeWh1anFobWl6cW53cmRvenJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3ODA1MjAsImV4cCI6MjA4MTM1NjUyMH0.C-zJJALkS29sLsRcWQBsgKoF0FWLsbW4A72Ch8XAz4Q';

// Инициализация клиента
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '../public');

// Хелпер для экранирования XML спецсимволов (критично для амперсандов в URL изображений)
function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&"']/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case "'": return '&apos;';
            default: return c;
        }
    });
}

// Статические маршруты
const staticRoutes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/blog', changefreq: 'daily', priority: 0.8 },
  { url: '/testimonials', changefreq: 'monthly', priority: 0.7 },
  { url: '/author/roman-tretiakov', changefreq: 'monthly', priority: 0.9 },
  { url: '/login', changefreq: 'yearly', priority: 0.3 },
];

async function generateSitemap() {
  console.log('🗺️  Начинаю генерацию Sitemap...');

  try {
    // 1. Получаем статьи из Supabase
    const { data: articles, error } = await supabase
      .from('articles')
      .select('title, slug, published_at, featured_image')
      .eq('published', true)
      .eq('is_lesson', false)
      .neq('slug', 'roman-tretiakov');

    if (error) throw error;

    console.log(`📄 Найдено статей: ${articles.length}`);

    // 2. Формируем XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

    const today = new Date().toISOString().split('T')[0];

    // Добавляем статические маршруты
    staticRoutes.forEach(route => {
      sitemap += `
  <url>
    <loc>${DOMAIN}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    });

    // Добавляем динамические маршруты (статьи)
    articles.forEach(article => {
      const date = article.published_at || new Date().toISOString();
      const featuredImage = article.featured_image;
      
      sitemap += `
  <url>
    <loc>${DOMAIN}/blog/${article.slug}</loc>
    <lastmod>${date.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>`;
      
      if (featuredImage) {
          sitemap += `
    <image:image>
      <image:loc>${escapeXml(featuredImage)}</image:loc>
      <image:title>${escapeXml(article.title)}</image:title>
    </image:image>`;
      }

      sitemap += `
  </url>`;
    });

    sitemap += `
</urlset>`;

    // 3. Записываем файл
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR);
    }

    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap успешно сгенерирован в public/sitemap.xml');

  } catch (e) {
    console.error('❌ Ошибка генерации Sitemap:', e);
    process.exit(1);
  }
}

generateSitemap();