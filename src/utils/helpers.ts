/**
 * Helper Functions
 * Вспомогательные функции для проекта
 */

/**
 * Форматирование даты
 */
export function formatDate(date: string | Date, locale: string = 'ru-RU'): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Форматирование времени
 */
export function formatTime(date: string | Date, locale: string = 'ru-RU'): string {
  const d = new Date(date);
  return d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Форматирование даты и времени
 */
export function formatDateTime(date: string | Date, locale: string = 'ru-RU'): string {
  return `${formatDate(date, locale)} ${formatTime(date, locale)}`;
}

/**
 * Генерация slug из текста
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Обрезание текста
 */
export function truncateText(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

/**
 * Подсчёт времени чтения
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Валидация email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Валидация телефона
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Валидация URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Получение инициалов из имени
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Форматирование числа с разделителями
 */
export function formatNumber(num: number, locale: string = 'ru-RU'): string {
  return num.toLocaleString(locale);
}

/**
 * Получение цвета по рейтингу
 */
export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return '#10b981'; // green
  if (rating >= 3.5) return '#3b82f6'; // blue
  if (rating >= 2.5) return '#f59e0b'; // amber
  return '#ef4444'; // red
}

/**
 * Задержка (для async операций)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Глубокое копирование объекта
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Проверка, пуст ли объект
 */
export function isEmpty(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Объединение классов CSS
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Получение параметра из URL
 */
export function getQueryParam(param: string): string | null {
  if (typeof window === 'undefined') return null;
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
}

/**
 * Установка параметра в URL
 */
export function setQueryParam(param: string, value: string): void {
  if (typeof window === 'undefined') return;
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(param, value);
  window.history.replaceState({}, '', `?${searchParams.toString()}`);
}
