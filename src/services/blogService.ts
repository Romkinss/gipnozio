/**
 * Blog Service
 * Сервис для работы с блог-постами из Supabase
 */

import { supabase } from '../lib/supabaseClient';
import type { Article, ApiResponse, PaginatedResult } from '../types/database';

export const blogService = {
  /**
   * Получить все опубликованные посты
   */
  getAllPosts: async (): Promise<Article[]> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('is_lesson', false)
        .order('publishedAt', { ascending: false });

      if (error) throw error;
      return (data || []) as Article[];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },

  /**
   * Получить пост по slug
   */
  getPostBySlug: async (slug: string): Promise<Article | null> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      return data as Article;
    } catch (error) {
      console.error(`Error fetching post with slug ${slug}:`, error);
      return null;
    }
  },

  /**
   * Получить посты по категории
   */
  getPostsByCategory: async (category: string): Promise<Article[]> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', category)
        .eq('published', true)
        .eq('is_lesson', false)
        .order('publishedAt', { ascending: false });

      if (error) throw error;
      return (data || []) as Article[];
    } catch (error) {
      console.error(`Error fetching posts by category ${category}:`, error);
      return [];
    }
  },

  /**
   * Получить посты с пагинацией
   */
  getPaginatedPosts: async (page: number = 1, limit: number = 10): Promise<PaginatedResult<Article>> => {
    try {
      const offset = (page - 1) * limit;

      // Получаем общее количество
      const { count } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('published', true)
        .eq('is_lesson', false);

      // Получаем данные
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('is_lesson', false)
        .order('publishedAt', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      const total = count || 0;
      const pages = Math.ceil(total / limit);

      return {
        items: (data || []) as Article[],
        total,
        page,
        limit,
        pages,
      };
    } catch (error) {
      console.error('Error fetching paginated posts:', error);
      return {
        items: [],
        total: 0,
        page,
        limit,
        pages: 0,
      };
    }
  },

  /**
   * Создать новый пост
   */
  createPost: async (post: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Article>> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert([{
          ...post,
          is_lesson: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data as Article,
        message: 'Post created successfully',
      };
    } catch (error) {
      console.error('Error creating post:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create post',
      };
    }
  },

  /**
   * Обновить пост
   */
  updatePost: async (id: string, updates: Partial<Article>): Promise<ApiResponse<Article>> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .update({
          ...updates,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data as Article,
        message: 'Post updated successfully',
      };
    } catch (error) {
      console.error('Error updating post:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update post',
      };
    }
  },

  /**
   * Удалить пост (ВНИМАНИЕ: это удаляет данные из БД!)
   * Используется только в админ-панели с подтверждением
   */
  deletePost: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return {
        success: true,
        message: 'Post deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting post:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete post',
      };
    }
  },

  /**
   * Получить все категории
   */
  getAllCategories: async (): Promise<string[]> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('category')
        .eq('published', true)
        .eq('is_lesson', false);

      if (error) throw error;

      const categories = new Set((data || []).map(item => item.category).filter(Boolean));
      return Array.from(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  /**
   * Получить все теги
   */
  getAllTags: async (): Promise<string[]> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('tags')
        .eq('published', true)
        .eq('is_lesson', false);

      if (error) throw error;

      const tags = new Set<string>();
      (data || []).forEach(item => {
        if (Array.isArray(item.tags)) {
          item.tags.forEach(tag => tags.add(tag));
        }
      });

      return Array.from(tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  },

  /**
   * Поиск постов
   */
  searchPosts: async (query: string): Promise<Article[]> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('is_lesson', false)
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
        .order('publishedAt', { ascending: false });

      if (error) throw error;
      return (data || []) as Article[];
    } catch (error) {
      console.error('Error searching posts:', error);
      return [];
    }
  },
};
