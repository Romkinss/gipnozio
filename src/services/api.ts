// Mock API сервис для Астро
export const api = {
  articles: {
    list: async (search?: string, category?: string) => {
      // Возвращаем пустой массив или mock данные
      return [];
    },
    get: async (slug: string) => {
      return null;
    }
  },
  categories: {
    list: async () => {
      return [];
    }
  },
  auth: {
    telegramLogin: async (userData: any) => {
      return userData;
    }
  },
  testimonials: {
    list: async () => {
      return [];
    }
  },
  lessons: {
    list: async () => {
      return [];
    },
    get: async (slug: string) => {
      return null;
    }
  }
};
