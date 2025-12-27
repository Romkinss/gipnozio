import { supabase } from './supabase';
import { authService } from './authService';
import { contentService } from './contentService';
import { lmsService } from './lmsService';
import { Attachment } from '../types';

// Импорты для сида (восстановлено для GRP-10)
import { INITIAL_ARTICLES } from './articles';
import { INITIAL_TESTIMONIALS } from './testimonials';
import { INITIAL_CATEGORIES } from './categories';

/**
 * Единая точка доступа к API. 
 * Использует модульные сервисы внутри для лучшей организации.
 */
export const api = {
  auth: {
    telegramLogin: authService.telegramLogin,
    getUser: authService.getUser
  },
  users: {
    list: authService.listUsers,
    updateRole: authService.updateRole
  },
  admin: {
    getAllProgress: lmsService.getAllProgress,
    getAllQuizResults: lmsService.getAllQuizResults
  },
  learning: {
    getModules: lmsService.getModules,
    getProgress: lmsService.getProgress,
    markCompleted: lmsService.markCompleted,
    getNote: lmsService.getNote,
    saveNote: lmsService.saveNote
  },
  quizzes: {
    create: lmsService.createQuiz,
    update: lmsService.updateQuiz,
    delete: lmsService.deleteQuiz,
    list: lmsService.listQuizzes,
    get: lmsService.getQuiz,
    saveResult: lmsService.saveQuizResult,
    getResults: lmsService.getQuizResults
  },
  surveys: {
    list: lmsService.listSurveys,
    get: lmsService.getSurvey,
    create: lmsService.createSurvey,
    update: lmsService.updateSurvey,
    delete: lmsService.deleteSurvey,
    saveResult: lmsService.saveSurveyResult,
    getResult: lmsService.getSurveyResult
  },
  articles: {
    list: contentService.listArticles,
    listNews: contentService.listNews,
    listPulse: contentService.listPulse,
    get: contentService.getArticle,
    getRelated: contentService.getRelatedArticles,
    adminList: contentService.adminListArticles,
    create: (data: any) => contentService.saveArticle(data),
    update: (id: string, data: any) => contentService.saveArticle({ ...data, id }),
    delete: contentService.deleteArticle
  },
  categories: {
    list: contentService.listCategories
  },
  testimonials: {
    list: contentService.listTestimonials,
    adminList: contentService.adminListTestimonials,
    create: (data: any) => contentService.saveTestimonial(data),
    update: (id: string, data: any) => contentService.saveTestimonial({ ...data, id }),
    delete: contentService.deleteTestimonial
  },
  consultations: {
    list: contentService.listConsultations,
    submit: contentService.submitConsultation
  },
  redirects: {
    get: contentService.getRedirect
  },
  storage: {
    upload: async (file: File, bucket: string = 'public-images') => {
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const { error } = await supabase.storage.from(bucket).upload(fileName, file);
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
        return { id: crypto.randomUUID(), name: file.name, url: publicUrl, size: '0' } as Attachment;
    }
  },
  // Восстановленный метод для синхронизации GRP-10
  seed: async () => {
    const logs: string[] = [];
    
    // 1. Categories
    logs.push('📦 Синхронизация категорий...');
    for (const cat of INITIAL_CATEGORIES) {
        const { error } = await supabase.from('categories').upsert(cat, { onConflict: 'slug' });
        logs.push(error ? `❌ Ошибка категории ${cat.name}: ${error.message}` : `✅ Категория ${cat.name} готова`);
    }

    // 2. Articles
    logs.push('📝 Синхронизация статей...');
    for (const art of INITIAL_ARTICLES) {
        const dbArt = {
            id: art.id,
            title: art.title,
            slug: art.slug,
            excerpt: art.excerpt,
            content: art.content,
            category: art.category,
            published: art.published,
            published_at: art.publishedAt,
            featured_image: art.featuredImage,
            is_lesson: art.is_lesson || false
        };
        const { error } = await supabase.from('articles').upsert(dbArt, { onConflict: 'slug' });
        logs.push(error ? `❌ Ошибка статьи ${art.title}: ${error.message}` : `✅ Статья ${art.title} готова`);
    }

    // 3. Testimonials
    logs.push('⭐️ Синхронизация отзывов...');
    for (const test of INITIAL_TESTIMONIALS) {
        const dbTest = {
            id: test.id,
            name: test.name,
            content: test.content,
            rating: test.rating,
            type: test.type,
            media_url: test.mediaUrl,
            thumbnail_url: test.thumbnailUrl,
            approved: test.approved,
            featured: test.featured,
            age: test.age,
            profession: test.profession
        };
        const { error } = await supabase.from('testimonials').upsert(dbTest, { onConflict: 'id' });
        logs.push(error ? `❌ Ошибка отзыва ${test.name}: ${error.message}` : `✅ Отзыв ${test.name} готов`);
    }

    return logs;
  }
};