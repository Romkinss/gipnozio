// Mock Supabase сервис для Астро
export const supabase = {
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: any) => ({
        maybeSingle: async () => ({ data: null }),
        single: async () => ({ data: null })
      }),
      async: async () => ({ data: [] })
    }),
    insert: async (data: any) => ({ data: null, error: null }),
    update: async (data: any) => ({ data: null, error: null }),
    delete: async () => ({ data: null, error: null })
  }),
  channel: (name: string) => ({
    on: (event: string, config: any, callback: any) => ({
      subscribe: () => {}
    }),
    subscribe: () => {}
  }),
  removeChannel: (channel: any) => {}
};
