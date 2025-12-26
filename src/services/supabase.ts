import { createClient } from '@supabase/supabase-js';

// Инициализация Supabase клиента
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Some features may not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Типы для Supabase
export interface SupabaseError {
  message: string;
  status?: number;
}

// Вспомогательные функции для работы с Supabase
export async function handleSupabaseError(error: any): Promise<SupabaseError> {
  if (error?.message) {
    return {
      message: error.message,
      status: error.status,
    };
  }
  return {
    message: 'An unknown error occurred',
  };
}

// Функция для безопасного выполнения запросов
export async function executeSupabaseQuery<T>(
  query: Promise<any>
): Promise<{ data: T | null; error: SupabaseError | null }> {
  try {
    const { data, error } = await query;
    if (error) {
      return {
        data: null,
        error: await handleSupabaseError(error),
      };
    }
    return {
      data: data as T,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: await handleSupabaseError(error),
    };
  }
}

// Кэширование результатов
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

export function getCachedData(key: string): any | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

export function setCachedData(key: string, data: any): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function clearCache(pattern?: string): void {
  if (pattern) {
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
}
