// Mock Content Service для Астро
export const contentService = {
  getContent: async (key: string) => {
    return null;
  },
  updateContent: async (key: string, data: any) => {
    return data;
  }
};
