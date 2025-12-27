import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

/**
 * Безопасное форматирование даты.
 * Если дата невалидна, возвращает заглушку.
 */
export const safeFormatDate = (dateStr?: string | Date, formatStr: string = 'dd.MM.yyyy HH:mm'): string => {
  if (!dateStr) return '—';
  try {
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    if (isNaN(date.getTime())) return '—';
    return format(date, formatStr, { locale: ru });
  } catch (e) {
    return '—';
  }
};

export const formatDateShort = (dateStr?: string | Date): string => {
    return safeFormatDate(dateStr, 'd MMMM yyyy');
};