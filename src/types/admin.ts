/**
 * Admin Panel Types
 * Типы данных для админ-панели
 */

// Пользователь админ-панели
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'moderator';
  createdAt: Date;
  lastLogin?: Date;
}

// Форма для создания/редактирования блог-поста
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

// Форма для создания/редактирования урока
export interface LessonFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  instructor: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // в минутах
  videoUrl?: string;
  materials?: string[];
  tags: string[];
  seo?: {
    metaDescription?: string;
    keywords?: string[];
  };
}

// Форма для создания/редактирования отзыва
export interface TestimonialFormData {
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number; // 1-5
  image?: string;
  verified: boolean;
}

// Ответ от API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Статус операции
export interface OperationStatus {
  loading: boolean;
  error?: string;
  success?: boolean;
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

// Фильтры для поиска
export interface SearchFilters {
  query?: string;
  category?: string;
  tag?: string;
  author?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// Статистика админ-панели
export interface AdminStats {
  totalPosts: number;
  totalLessons: number;
  totalTestimonials: number;
  recentPosts: number; // за последние 7 дней
  recentLessons: number;
  recentTestimonials: number;
}

// Уведомление
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number; // в миллисекундах
}

// Модальное окно
export interface ModalState {
  isOpen: boolean;
  title?: string;
  message?: string;
  type?: 'confirm' | 'alert' | 'delete';
  onConfirm?: () => void;
  onCancel?: () => void;
}
