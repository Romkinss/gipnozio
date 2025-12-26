/**
 * Application Constants
 * Константы приложения ГИПНОЗИО
 */

// Site Configuration
export const SITE_NAME = 'ГИПНОЗИО';
export const SITE_DESCRIPTION = 'Профессиональная гипнотерапия для высокопрофильных клиентов';
export const SITE_URL = 'https://gipnozio.ru';
export const SITE_AUTHOR = 'Roman Tretiakov';

// Contact Information
export const CONTACT_EMAIL = 'info@gipnozio.ru';
export const CONTACT_PHONE = '+7 (XXX) XXX-XX-XX';
export const CONTACT_TELEGRAM = '@gipnozio';

// Social Links
export const SOCIAL_LINKS = {
  telegram: 'https://t.me/gipnozio',
  instagram: 'https://instagram.com/gipnozio',
  facebook: 'https://facebook.com/gipnozio',
};

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Cache Duration (in seconds)
export const CACHE_DURATION = {
  SHORT: 5 * 60, // 5 minutes
  MEDIUM: 30 * 60, // 30 minutes
  LONG: 24 * 60 * 60, // 24 hours
};

// Blog Categories
export const BLOG_CATEGORIES = [
  'Гипноз',
  'Психология',
  'Здоровье',
  'Развитие',
  'Другое',
];

// Lesson Levels
export const LESSON_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
};

// Rating Scale
export const RATING_SCALE = [1, 2, 3, 4, 5];

// Status Values
export const REQUEST_STATUS = {
  NEW: 'new',
  READ: 'read',
  RESPONDED: 'responded',
  CLOSED: 'closed',
};

// Testimonial Types
export const TESTIMONIAL_TYPES = {
  TEXT: 'text',
  VIDEO: 'video',
  IMAGE: 'image',
};

// Admin Roles
export const ADMIN_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Ошибка сети. Пожалуйста, попробуйте позже.',
  VALIDATION_ERROR: 'Пожалуйста, проверьте введённые данные.',
  NOT_FOUND: 'Запрашиваемый ресурс не найден.',
  UNAUTHORIZED: 'Требуется авторизация.',
  FORBIDDEN: 'Доступ запрещён.',
  SERVER_ERROR: 'Ошибка сервера. Пожалуйста, попробуйте позже.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Успешно создано.',
  UPDATED: 'Успешно обновлено.',
  DELETED: 'Успешно удалено.',
  SAVED: 'Успешно сохранено.',
};
