/**
 * Database Types
 * Типы данных для работы с Supabase БД
 */

// Статья/Пост блога
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  published: boolean;
  publishedAt: string;
  readingTime?: number;
  viewsCount?: number;
  is_lesson?: boolean;
  module_number?: number;
  lesson_order?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Отзыв клиента
export interface Testimonial {
  id: string;
  name: string;
  age?: number;
  profession?: string;
  content: string;
  type: 'text' | 'video' | 'image';
  mediaUrl?: string;
  thumbnailUrl?: string;
  rating: number; // 1-5
  featured: boolean;
  approved: boolean;
  createdAt: string;
}

// Пользователь
export interface User {
  id: string;
  telegramId?: number;
  email?: string;
  name: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// Заявка/Запрос
export interface Request {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'closed';
  createdAt: string;
  respondedAt?: string;
}

// Прогресс урока
export interface LessonProgress {
  id: string;
  telegramId: number;
  lessonId: string;
  isCompleted: boolean;
  completedAt?: string;
  updatedAt: string;
}

// Заметка пользователя
export interface UserNote {
  id: string;
  telegramId: number;
  lessonId: string;
  content: string;
  updatedAt: string;
}

// Тест/Квиз
export interface Quiz {
  id: string;
  title: string;
  data: any;
  createdAt: string;
  updatedAt: string;
}

// Результат теста
export interface QuizResult {
  id: string;
  telegramId: number;
  quizId: string;
  score: number;
  completedAt: string;
}

// Опрос/Анкета
export interface Survey {
  id: string;
  title: string;
  statements: any;
  createdAt: string;
  updatedAt: string;
}

// Результат опроса
export interface SurveyResult {
  id: string;
  telegramId: number;
  surveyId: string;
  lessonId: string;
  responses: any;
  updatedAt: string;
}

// Ответ API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Пагинация
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Результат пагинации
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
