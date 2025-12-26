/**
 * Lessons Service
 * Сервис для работы с уроками из Supabase
 */

import { supabase } from '../lib/supabaseClient';
import type { Article, ApiResponse, PaginatedResult } from '../types/database';

export const lessonsService = {
  /**
   * Получить все опубликованные уроки
   */
  getAllLessons: async (): Promise<Article[]> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('is_lesson', true)
        .order('module_number', { ascending: true })
        .order('lesson_order', { ascending: true });

      if (error) throw error;
      return (data || []) as Article[];
    } catch (error) {
      console.error('Error fetching lessons:', error);
      return [];
    }
  },

  /**
   * Получить урок по slug
   */
  getLessonBySlug: async (slug: string): Promise<Article | null> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .eq('is_lesson', true)
        .single();

      if (error) throw error;
      return data as Article;
    } catch (error) {
      console.error(`Error fetching lesson with slug ${slug}:`, error);
      return null;
    }
  },

  /**
   * Получить уроки по модулю
   */
  getLessonsByModule: async (moduleNumber: number): Promise<Article[]> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('module_number', moduleNumber)
        .eq('published', true)
        .eq('is_lesson', true)
        .order('lesson_order', { ascending: true });

      if (error) throw error;
      return (data || []) as Article[];
    } catch (error) {
      console.error(`Error fetching lessons for module ${moduleNumber}:`, error);
      return [];
    }
  },

  /**
   * Получить уроки с пагинацией
   */
  getPaginatedLessons: async (page: number = 1, limit: number = 10): Promise<PaginatedResult<Article>> => {
    try {
      const offset = (page - 1) * limit;

      // Получаем общее количество
      const { count } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('published', true)
        .eq('is_lesson', true);

      // Получаем данные
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('is_lesson', true)
        .order('module_number', { ascending: true })
        .order('lesson_order', { ascending: true })
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
      console.error('Error fetching paginated lessons:', error);
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
   * Создать новый урок
   */
  createLesson: async (lesson: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Article>> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert([{
          ...lesson,
          is_lesson: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data as Article,
        message: 'Lesson created successfully',
      };
    } catch (error) {
      console.error('Error creating lesson:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create lesson',
      };
    }
  },

  /**
   * Обновить урок
   */
  updateLesson: async (id: string, updates: Partial<Article>): Promise<ApiResponse<Article>> => {
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
        message: 'Lesson updated successfully',
      };
    } catch (error) {
      console.error('Error updating lesson:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update lesson',
      };
    }
  },

  /**
   * Удалить урок (ВНИМАНИЕ: это удаляет данные из БД!)
   */
  deleteLesson: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return {
        success: true,
        message: 'Lesson deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting lesson:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete lesson',
      };
    }
  },

  /**
   * Получить все модули
   */
  getAllModules: async (): Promise<number[]> => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('module_number')
        .eq('published', true)
        .eq('is_lesson', true)
        .not('module_number', 'is', null);

      if (error) throw error;

      const modules = new Set((data || []).map(item => item.module_number).filter(Boolean));
      return Array.from(modules).sort((a, b) => a - b);
    } catch (error) {
      console.error('Error fetching modules:', error);
      return [];
    }
  },
};
