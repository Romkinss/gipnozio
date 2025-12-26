// ============================================
// ОСНОВНЫЕ ТИПЫ ДАННЫХ
// ============================================

// Статьи и контент
export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt?: string;
  content: string;
  author: string;
  publishedAt: Date;
  updatedAt?: Date;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  readingTime?: number;
  viewsCount?: number;
  // LMS fields
  is_lesson?: boolean;
  module_number?: number;
  lesson_order?: number;
  access_level?: 'free' | 'premium' | 'vip';
  attachments?: Attachment[];
  // News fields
  is_featured_news?: boolean;
  event_date?: Date;
  event_time?: string;
  marker_type?: 'live' | 'ceremony' | 'podcast' | 'lesson' | 'meetup' | 'case' | 'insight';
  external_url?: string;
  seo?: SEOData;
}

export interface BlogPost extends Article {
  // Blog specific fields
}

export interface LessonContent extends Article {
  duration: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  order: number;
  module?: string;
  objectives?: string[];
  prerequisites?: string[];
  resources?: Resource[];
  videoUrl?: string;
  videoTranscript?: string;
  quiz?: QuizData;
}

// Категории
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  postCount?: number;
}

// Отзывы
export interface Testimonial {
  id: string;
  name: string;
  content: string;
  age?: number;
  profession?: string;
  rating: number;
  type: 'video' | 'image' | 'text';
  mediaUrl?: string;
  thumbnailUrl?: string;
  approved: boolean;
  featured: boolean;
  createdAt: Date;
}

// Консультации
export interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  consultationType?: string;
  message: string;
  source_page?: string;
  source_url?: string;
  status: 'new' | 'contacted' | 'completed' | 'rejected';
  created_at: Date;
}

// Профиль пользователя
export interface UserProfile {
  id: string;
  telegram_id?: string;
  username?: string;
  first_name: string;
  last_name?: string;
  avatar_url?: string;
  email?: string;
  phone?: string;
  role_level: 'student' | 'instructor' | 'admin';
  created_at: Date;
  updated_at?: Date;
}

// Прогресс обучения
export interface LessonProgress {
  id: string;
  telegram_id: string;
  lesson_id: string;
  is_completed: boolean;
  progress_percentage?: number;
  notes?: string;
  updated_at: Date;
}

// Тесты
export interface Quiz {
  id: string;
  title: string;
  description?: string;
  data: QuizQuestion[];
  created_at: Date;
  updated_at?: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

// Опросы
export interface Survey {
  id: string;
  title: string;
  description?: string;
  statements: SurveyStatement[];
  created_at: Date;
  updated_at?: Date;
}

export interface SurveyStatement {
  id: string;
  statement: string;
  scale: number; // 1-5, 1-7, etc.
}

// Ресурсы
export interface Resource {
  title: string;
  url: string;
  type?: 'video' | 'pdf' | 'link' | 'exercise' | 'document';
  description?: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

// SEO данные
export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

// Quiz данные в статье
export interface QuizData {
  enabled?: boolean;
  questions?: number;
  passingScore?: number;
}

// Данные для страницы
export interface PageData {
  title: string;
  description: string;
  content: string;
  seo?: SEOData;
}

// Статистика
export interface Statistics {
  totalStudents: number;
  totalLessons: number;
  totalArticles: number;
  averageRating: number;
  countriesCount: number;
  successRate: number;
}

// Навигация
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// Ответ API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Пагинация
export interface PaginationData {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends PaginationData {
  items: T[];
}
