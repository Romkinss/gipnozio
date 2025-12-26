/**
 * Main Types File
 * Все типы данных для проекта ГИПНОЗИО
 */

// ============================================
// ARTICLE / BLOG POST TYPES
// ============================================

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

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
}

// ============================================
// TESTIMONIAL TYPES
// ============================================

export interface Testimonial {
  id: string;
  name: string;
  age?: number;
  profession?: string;
  company?: string;
  content: string;
  type: 'text' | 'video' | 'image';
  mediaUrl?: string;
  thumbnailUrl?: string;
  rating: number; // 1-5
  featured: boolean;
  approved: boolean;
  createdAt: string;
  updatedAt?: string;
}

// ============================================
// USER & CONSULTATION TYPES
// ============================================

export interface User {
  id: string;
  telegramId?: number;
  email?: string;
  name: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    telegram?: string;
    instagram?: string;
    facebook?: string;
  };
  preferences?: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    language: string;
  };
  updatedAt: string;
}

export interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'closed';
  createdAt: string;
  respondedAt?: string;
  response?: string;
}

// ============================================
// LESSON & LEARNING TYPES
// ============================================

export interface Lesson extends Article {
  is_lesson: true;
  module_number: number;
  lesson_order: number;
  duration: number; // в минутах
  videoUrl?: string;
  materials?: string[];
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface LessonProgress {
  id: string;
  telegramId: number;
  lessonId: string;
  isCompleted: boolean;
  completedAt?: string;
  updatedAt: string;
}

export interface UserNote {
  id: string;
  telegramId: number;
  lessonId: string;
  content: string;
  updatedAt: string;
}

// ============================================
// QUIZ & SURVEY TYPES
// ============================================

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  lessonId?: string;
  questions: QuizQuestion[];
  passingScore: number; // процент
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'text';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface QuizResult {
  id: string;
  telegramId: number;
  quizId: string;
  score: number;
  answers: Record<string, string | string[]>;
  completedAt: string;
}

export interface Survey {
  id: string;
  title: string;
  description?: string;
  statements: SurveyStatement[];
  createdAt: string;
  updatedAt: string;
}

export interface SurveyStatement {
  id: string;
  statement: string;
  type: 'likert' | 'text' | 'choice';
  options?: string[];
}

export interface SurveyResult {
  id: string;
  telegramId: number;
  surveyId: string;
  lessonId?: string;
  responses: Record<string, string | number>;
  updatedAt: string;
}

// ============================================
// REQUEST TYPES
// ============================================

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

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  tag?: string;
  author?: string;
  dateFrom?: Date;
  dateTo?: Date;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

// ============================================
// ADMIN TYPES
// ============================================

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'moderator';
  createdAt: Date;
  lastLogin?: Date;
}

export interface BlogPostFormData {
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  readingTime?: number;
  seo?: {
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface LessonFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  instructor: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  videoUrl?: string;
  materials?: string[];
  tags: string[];
  seo?: {
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface TestimonialFormData {
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
  verified: boolean;
}

// ============================================
// STATISTICS TYPES
// ============================================

export interface AdminStats {
  totalPosts: number;
  totalLessons: number;
  totalTestimonials: number;
  totalUsers: number;
  recentPosts: number;
  recentLessons: number;
  recentTestimonials: number;
  recentUsers: number;
}

export interface UserStats {
  totalLessonsCompleted: number;
  totalQuizzesCompleted: number;
  averageScore: number;
  lastActivityDate?: string;
}

// ============================================
// UI COMPONENT TYPES
// ============================================

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface ModalState {
  isOpen: boolean;
  title?: string;
  message?: string;
  type?: 'confirm' | 'alert' | 'delete';
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface OperationStatus {
  loading: boolean;
  error?: string;
  success?: boolean;
}

// ============================================
// SUPABASE RESPONSE TYPES
// ============================================

export interface SupabaseError {
  message: string;
  status?: number;
  code?: string;
}

export interface SupabaseResponse<T> {
  data: T | null;
  error: SupabaseError | null;
}
