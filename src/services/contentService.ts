import { getCollection } from 'astro:content';
import type { Article, Category } from '../types/index';

// Простой кэш в памяти
const cache = new Map<string, any>();
const CACHE_TTL = 1000 * 60 * 5; // 5 минут

function getCachedData(key: string): any {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

function setCachedData(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Получить все статьи блога
 */
export async function getAllBlogPosts(): Promise<Article[]> {
  const cacheKey = 'all_blog_posts';
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const posts = await getCollection('blog');
    const articles: Article[] = posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.data.title,
      description: post.data.description,
      excerpt: post.data.excerpt,
      content: post.body,
      author: post.data.author,
      publishedAt: post.data.publishedAt.toISOString(),
      updatedAt: post.data.updatedAt?.toISOString(),
      category: post.data.category,
      tags: post.data.tags,
      featuredImage: post.data.featuredImage,
      featuredImageAlt: post.data.featuredImageAlt,
      readingTime: post.data.readingTime,
      seo: post.data.seo,
    }));

    // Сортируем по дате (новые первыми)
    const sorted = articles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    setCachedData(cacheKey, sorted);
    return sorted;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Получить статью по slug
 */
export async function getBlogPostBySlug(slug: string): Promise<Article | null> {
  try {
    const posts = await getAllBlogPosts();
    return posts.find((post) => post.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Получить статьи по категории
 */
export async function getBlogPostsByCategory(category: string): Promise<Article[]> {
  const cacheKey = `blog_posts_category_${category}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const posts = await getAllBlogPosts();
    const filtered = posts.filter((post) => post.category === category);
    setCachedData(cacheKey, filtered);
    return filtered;
  } catch (error) {
    console.error(`Error fetching blog posts for category ${category}:`, error);
    return [];
  }
}

/**
 * Получить статьи по тегу
 */
export async function getBlogPostsByTag(tag: string): Promise<Article[]> {
  const cacheKey = `blog_posts_tag_${tag}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const posts = await getAllBlogPosts();
    const filtered = posts.filter((post) => post.tags?.includes(tag));
    setCachedData(cacheKey, filtered);
    return filtered;
  } catch (error) {
    console.error(`Error fetching blog posts for tag ${tag}:`, error);
    return [];
  }
}

/**
 * Получить все уникальные категории
 */
export async function getAllCategories(): Promise<Category[]> {
  const cacheKey = 'all_categories';
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const posts = await getAllBlogPosts();
    const categorySet = new Set<string>();
    
    posts.forEach((post) => {
      if (post.category) {
        categorySet.add(post.category);
      }
    });

    const categories: Category[] = Array.from(categorySet).map((name) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    }));

    setCachedData(cacheKey, categories);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Получить все уникальные теги
 */
export async function getAllTags(): Promise<string[]> {
  const cacheKey = 'all_tags';
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const posts = await getAllBlogPosts();
    const tagSet = new Set<string>();
    
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tagSet.add(tag));
    });

    const tags = Array.from(tagSet).sort();
    setCachedData(cacheKey, tags);
    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

/**
 * Получить похожие статьи
 */
export async function getRelatedPosts(
  slug: string,
  limit: number = 3
): Promise<Article[]> {
  try {
    const currentPost = await getBlogPostBySlug(slug);
    if (!currentPost) return [];

    const allPosts = await getAllBlogPosts();
    
    // Фильтруем похожие статьи по категории или тегам
    const related = allPosts
      .filter((post) => post.slug !== slug)
      .filter((post) => 
        post.category === currentPost.category ||
        post.tags?.some((tag) => currentPost.tags?.includes(tag))
      )
      .slice(0, limit);

    return related;
  } catch (error) {
    console.error(`Error fetching related posts for ${slug}:`, error);
    return [];
  }
}

/**
 * Получить статьи для пагинации
 */
export async function getPaginatedPosts(
  page: number = 1,
  pageSize: number = 10
): Promise<{ posts: Article[]; total: number; pages: number }> {
  try {
    const allPosts = await getAllBlogPosts();
    const total = allPosts.length;
    const pages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const posts = allPosts.slice(start, end);

    return { posts, total, pages };
  } catch (error) {
    console.error('Error fetching paginated posts:', error);
    return { posts: [], total: 0, pages: 0 };
  }
}

/**
 * Поиск статей по ключевому слову
 */
export async function searchPosts(query: string): Promise<Article[]> {
  try {
    const allPosts = await getAllBlogPosts();
    const lowerQuery = query.toLowerCase();

    return allPosts.filter((post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  } catch (error) {
    console.error(`Error searching posts for "${query}":`, error);
    return [];
  }
}
