import { supabase } from './supabase';
import { Article, LessonProgress, UserNote, Quiz, QuizResult, Survey, SurveyResult } from '../types';
import { mapArticleFromDB } from './mappers';

export const lmsService = {
  getModules: async () => {
      const { data: dbLessons } = await supabase
          .from('articles')
          .select('*')
          .eq('is_lesson', true)
          .eq('published', true)
          .order('module_number', { ascending: true })
          .order('lesson_order', { ascending: true });
      
      const mappedDb = dbLessons ? dbLessons.map(mapArticleFromDB) : [];
      
      return mappedDb.sort((a, b) => {
          const modDiff = (a.module_number || 0) - (b.module_number || 0);
          if (modDiff !== 0) return modDiff;
          return (a.lesson_order || 0) - (b.lesson_order || 0);
      });
  },

  getProgress: async (telegramId: number) => {
      const { data } = await supabase.from('lesson_progress').select('*').eq('telegram_id', telegramId);
      return (data || []) as LessonProgress[];
  },

  markCompleted: async (telegramId: number, lessonId: string) => {
      await supabase.from('lesson_progress').upsert({
          telegram_id: telegramId,
          lesson_id: lessonId,
          is_completed: true,
          updated_at: new Date().toISOString()
      }, { onConflict: 'telegram_id,lesson_id' });
  },

  getNote: async (telegramId: number, lessonId: string) => {
      const { data } = await supabase.from('lesson_notes').select('*').eq('telegram_id', telegramId).eq('lesson_id', lessonId).maybeSingle();
      return data as UserNote;
  },

  saveNote: async (telegramId: number, lessonId: string, content: string) => {
      const { error } = await supabase.from('lesson_notes').upsert({
          telegram_id: telegramId,
          lesson_id: lessonId,
          content,
          updated_at: new Date().toISOString()
      }, { onConflict: 'telegram_id,lesson_id' });
      if (error) throw error;
  },

  // Quizzes
  createQuiz: async (title: string, data: any) => {
      const { data: quiz, error } = await supabase.from('quizzes').insert([{ title, data }]).select().single();
      if (error) throw error;
      return quiz as Quiz;
  },

  updateQuiz: async (id: string, title: string, data: any) => {
      const { data: quiz, error } = await supabase.from('quizzes').update({ title, data }).eq('id', id).select().single();
      if (error) throw error;
      return quiz as Quiz;
  },

  deleteQuiz: async (id: string) => {
      const { error } = await supabase.from('quizzes').delete().eq('id', id);
      if (error) throw error;
  },

  listQuizzes: async () => {
      const { data } = await supabase.from('quizzes').select('*').order('id', { ascending: false });
      return (data || []) as Quiz[];
  },

  getQuiz: async (id: string) => {
      const { data } = await supabase.from('quizzes').select('*').eq('id', id).maybeSingle();
      return data as Quiz;
  },

  saveQuizResult: async (telegramId: number, quizId: string, score: number) => {
      await supabase.from('quiz_results').upsert({
          telegram_id: telegramId,
          quiz_id: quizId,
          score: score,
          completed_at: new Date().toISOString()
      }, { onConflict: 'telegram_id,quiz_id' });
  },

  getQuizResults: async (telegramId: number) => {
      const { data } = await supabase.from('quiz_results').select('*').eq('telegram_id', telegramId);
      return (data || []) as QuizResult[];
  },

  // Surveys
  listSurveys: async () => {
    const { data } = await supabase.from('surveys').select('*').order('id', { ascending: false });
    return (data || []) as Survey[];
  },

  getSurvey: async (id: string) => {
    const { data } = await supabase.from('surveys').select('*').eq('id', id).maybeSingle();
    return data as Survey;
  },

  createSurvey: async (title: string, statements: any) => {
    const { data, error } = await supabase.from('surveys').insert([{ title, statements }]).select().single();
    if (error) throw error;
    return data as Survey;
  },

  updateSurvey: async (id: string, title: string, statements: any) => {
    const { data, error } = await supabase.from('surveys').update({ title, statements }).eq('id', id).select().single();
    if (error) throw error;
    return data as Survey;
  },

  deleteSurvey: async (id: string) => {
    await supabase.from('surveys').delete().eq('id', id);
  },

  saveSurveyResult: async (telegramId: number, surveyId: string, lessonId: string, responses: any) => {
    const { error } = await supabase.from('survey_results').upsert({
      telegram_id: telegramId,
      survey_id: surveyId,
      lesson_id: lessonId,
      responses,
      updated_at: new Date().toISOString()
    }, { onConflict: 'telegram_id,survey_id,lesson_id' });
    if (error) throw error;
  },

  getSurveyResult: async (telegramId: number, surveyId: string, lessonId: string) => {
    const { data } = await supabase.from('survey_results')
      .select('*')
      .eq('telegram_id', telegramId)
      .eq('survey_id', surveyId)
      .eq('lesson_id', lessonId)
      .maybeSingle();
    return data as SurveyResult;
  },

  // Admin Stats
  getAllProgress: async () => {
     const { data } = await supabase.from('lesson_progress').select('*');
     return (data || []) as LessonProgress[];
  },

  getAllQuizResults: async () => {
     const { data } = await supabase.from('quiz_results').select('*');
     return (data || []) as QuizResult[];
  }
};