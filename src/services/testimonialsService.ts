/**
 * Testimonials Service
 * Сервис для работы с отзывами из Supabase
 */

import { supabase } from '../lib/supabaseClient';
import type { Testimonial, ApiResponse } from '../types/database';

export const testimonialsService = {
  /**
   * Получить все одобренные отзывы
   */
  getAllTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('createdAt', { ascending: false });

      if (error) throw error;
      return (data || []) as Testimonial[];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },

  /**
   * Получить избранные отзывы
   */
  getFeaturedTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .eq('featured', true)
        .order('createdAt', { ascending: false });

      if (error) throw error;
      return (data || []) as Testimonial[];
    } catch (error) {
      console.error('Error fetching featured testimonials:', error);
      return [];
    }
  },

  /**
   * Получить отзывы по типу
   */
  getTestimonialsByType: async (type: 'text' | 'video' | 'image'): Promise<Testimonial[]> => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('type', type)
        .eq('approved', true)
        .order('createdAt', { ascending: false });

      if (error) throw error;
      return (data || []) as Testimonial[];
    } catch (error) {
      console.error(`Error fetching testimonials by type ${type}:`, error);
      return [];
    }
  },

  /**
   * Получить отзыв по ID
   */
  getTestimonialById: async (id: string): Promise<Testimonial | null> => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Testimonial;
    } catch (error) {
      console.error(`Error fetching testimonial with id ${id}:`, error);
      return null;
    }
  },

  /**
   * Создать новый отзыв
   */
  createTestimonial: async (testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Promise<ApiResponse<Testimonial>> => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([{
          ...testimonial,
          createdAt: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data as Testimonial,
        message: 'Testimonial created successfully',
      };
    } catch (error) {
      console.error('Error creating testimonial:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create testimonial',
      };
    }
  },

  /**
   * Обновить отзыв
   */
  updateTestimonial: async (id: string, updates: Partial<Testimonial>): Promise<ApiResponse<Testimonial>> => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data: data as Testimonial,
        message: 'Testimonial updated successfully',
      };
    } catch (error) {
      console.error('Error updating testimonial:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update testimonial',
      };
    }
  },

  /**
   * Удалить отзыв (ВНИМАНИЕ: это удаляет данные из БД!)
   */
  deleteTestimonial: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return {
        success: true,
        message: 'Testimonial deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete testimonial',
      };
    }
  },

  /**
   * Одобрить отзыв
   */
  approveTestimonial: async (id: string): Promise<ApiResponse<Testimonial>> => {
    return testimonialsService.updateTestimonial(id, { approved: true });
  },

  /**
   * Отклонить отзыв
   */
  rejectTestimonial: async (id: string): Promise<ApiResponse<Testimonial>> => {
    return testimonialsService.updateTestimonial(id, { approved: false });
  },

  /**
   * Отметить как избранный
   */
  markAsFeatured: async (id: string): Promise<ApiResponse<Testimonial>> => {
    return testimonialsService.updateTestimonial(id, { featured: true });
  },

  /**
   * Убрать из избранных
   */
  unmarkAsFeatured: async (id: string): Promise<ApiResponse<Testimonial>> => {
    return testimonialsService.updateTestimonial(id, { featured: false });
  },

  /**
   * Получить все неодобренные отзывы (для модерации)
   */
  getPendingTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', false)
        .order('createdAt', { ascending: true });

      if (error) throw error;
      return (data || []) as Testimonial[];
    } catch (error) {
      console.error('Error fetching pending testimonials:', error);
      return [];
    }
  },
};
