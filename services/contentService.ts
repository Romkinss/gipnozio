import { supabase } from './supabase';
import { Article, Category, Testimonial, Consultation, Redirect } from '../types';
import { mapArticleFromDB, mapArticleToDB, mapTestimonialFromDB, mapTestimonialToDB } from './mappers';

const TELEGRAM_BOT_TOKEN = '8342145689:AAEPvUoWqV4LnK9Ll4LvNeWOghD7kEfRjNE';
const TELEGRAM_CHAT_ID = '364714907';

export const contentService = {
  // Articles (Blog) - Exclude Featured News, Lessons and Special Pages
  listArticles: async (search?: string, categorySlug?: string) => {
    let query = supabase.from('articles').select('*')
      .eq('published', true)
      .neq('is_lesson', true)
      .neq('is_featured_news', true)
      .neq('slug', 'for-clients'); 
      
    if (categorySlug) {
      const { data: catData } = await supabase.from('categories').select('name').eq('slug', categorySlug).maybeSingle();
      if (catData) query = query.eq('category', catData.name);
    } else {
      query = query.neq('category', 'Документы');
    }
    if (search) query = query.ilike('title', `%${search}%`);
    query = query.order('published_at', { ascending: false });
    const { data } = await query;
    return data ? data.map(mapArticleFromDB) : [];
  },

  // News (Pulse) - Only Featured News
  listNews: async (limit: number = 6) => {
    const { data } = await supabase.from('articles')
      .select('*')
      .eq('published', true)
      .eq('is_featured_news', true)
      .order('published_at', { ascending: false })
      .limit(limit);
    return data ? data.map(mapArticleFromDB) : [];
  },

  // Full Pulse List
  listPulse: async (filter?: string) => {
    let query = supabase.from('articles')
      .select('*')
      .eq('published', true)
      .eq('is_featured_news', true);

    if (filter && filter !== 'all') {
        query = query.eq('marker_type', filter);
    }

    query = query.order('published_at', { ascending: false });
    const { data } = await query;
    return data ? data.map(mapArticleFromDB) : [];
  },

  getArticle: async (slug: string) => {
    const { data } = await supabase.from('articles').select('*').eq('slug', slug).maybeSingle();
    if (data) return mapArticleFromDB(data);
    return undefined;
  },

  getRelatedArticles: async (slug: string, category?: string) => {
      if (!category) return [];
      const { data } = await supabase
          .from('articles')
          .select('*')
          .eq('category', category)
          .eq('published', true)
          .neq('slug', slug)
          .neq('is_lesson', true)
          .neq('is_featured_news', true)
          .neq('slug', 'for-clients') 
          .limit(3);
      return data ? data.map(mapArticleFromDB) : [];
  },

  adminListArticles: async (isLesson: boolean = false) => {
    let query = supabase.from('articles').select('*');
    if (isLesson) {
        query = query.eq('is_lesson', true).order('module_number', {ascending: true}).order('lesson_order', {ascending: true});
    } else {
        query = query.or('is_lesson.is.null,is_lesson.eq.false').order('published_at', { ascending: false });
    }
    const { data } = await query;
    return data ? data.map(mapArticleFromDB) : [];
  },

  saveArticle: async (data: Article) => {
      const dbData = mapArticleToDB(data);
      if (data.id) {
          const { data: res, error } = await supabase.from('articles').update(dbData).eq('id', data.id).select();
          if (error) throw error;
          return res?.[0] ? mapArticleFromDB(res[0]) : undefined;
      } else {
          const { data: res, error } = await supabase.from('articles').insert([dbData]).select();
          if (error) throw error;
          return res?.[0] ? mapArticleFromDB(res[0]) : undefined;
      }
  },

  deleteArticle: async (id: string) => {
      await supabase.from('articles').delete().eq('id', id);
  },

  // Categories
  listCategories: async () => {
    const { data } = await supabase.from('categories').select('*');
    return (data || []) as Category[];
  },

  // Testimonials
  listTestimonials: async (filter: 'all' | 'video' | 'image') => {
      const query = supabase.from('testimonials').select('*').eq('approved', true);
      if (filter !== 'all') query.eq('type', filter);
      query.order('featured', { ascending: false });
      const { data } = await query;
      return data ? data.map(mapTestimonialFromDB) : [];
  },

  adminListTestimonials: async () => {
      const { data } = await supabase.from('testimonials').select('*').order('id', { ascending: false });
      return data ? data.map(mapTestimonialFromDB) : [];
  },

  saveTestimonial: async (data: Partial<Testimonial>) => {
      const dbData = mapTestimonialToDB(data);
      if (data.id) {
          const { data: res, error } = await supabase.from('testimonials').update(dbData).eq('id', data.id).select();
          if (error) throw error;
          return res?.[0] ? mapTestimonialFromDB(res[0]) : undefined;
      } else {
          const { data: res, error } = await supabase.from('testimonials').insert([dbData]).select();
          if (error) throw error;
          return res?.[0] ? mapTestimonialFromDB(res[0]) : undefined;
      }
  },

  deleteTestimonial: async (id: string) => {
      await supabase.from('testimonials').delete().eq('id', id);
  },

  // Consultations
  listConsultations: async () => {
      const { data } = await supabase.from('consultations').select('*').order('created_at', { ascending: false });
      return (data || []) as Consultation[];
  },

  submitConsultation: async (data: { name: string; phone: string; source_page?: string; source_url?: string }) => {
      const payload = {
          name: data.name,
          phone: data.phone,
          source_page: data.source_page || 'Не указана',
          source_url: data.source_url || window.location.href,
          status: 'new'
      };

      const { error: dbError } = await supabase.from('consultations').insert([payload]);
      if (dbError) throw dbError;

      const text = `⚡ <b>НОВАЯ ЗАЯВКА GIPNOZIO</b>\n\n` +
                   `👤 <b>Имя:</b> ${data.name}\n` +
                   `📞 <b>Тел:</b> ${data.phone}\n` +
                   `📖 <b>Интерес:</b> ${data.source_page || 'Главная'}\n` +
                   `🔗 <a href="${payload.source_url}">Открыть страницу</a>`;

      try {
          await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  chat_id: TELEGRAM_CHAT_ID,
                  text: text,
                  parse_mode: 'HTML',
                  disable_web_page_preview: false
              })
          });
      } catch (tgError) {
          console.error('Failed to send TG notification', tgError);
      }

      return true;
  },

  // Redirects
  getRedirect: async (fromPath: string) => {
      const { data } = await supabase.from('redirects').select('*').eq('from_path', fromPath).maybeSingle();
      return data as Redirect;
  }
};