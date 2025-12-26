import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const blog = await getCollection('blog');
  
  return rss({
    title: 'GIPNOZIO Academy - Блог',
    description: 'Статьи о гипнотерапии, психологии и личностном развитии',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      author: post.data.author,
      categories: post.data.tags,
    })),
    customData: `<language>ru-ru</language>`,
  });
}
