
import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { Article, Testimonial, Category, UserProfile, Quiz } from '../types';

export const useAdminData = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [lessons, setLessons] = useState<Article[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [students, setStudents] = useState<UserProfile[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        api.articles.adminList(false),
        api.articles.adminList(true),
        api.testimonials.adminList(),
        api.consultations.list(),
        api.categories.list(),
        api.users.list(),
        api.quizzes.list()
      ]);

      if (results[0].status === 'fulfilled') setArticles(results[0].value || []);
      if (results[1].status === 'fulfilled') setLessons(results[1].value || []);
      if (results[2].status === 'fulfilled') setTestimonials(results[2].value || []);
      if (results[3].status === 'fulfilled') setConsultations(results[3].value || []);
      if (results[4].status === 'fulfilled') setCategories(results[4].value || []);
      if (results[5].status === 'fulfilled') setStudents(results[5].value || []);
      if (results[6].status === 'fulfilled') setQuizzes(results[6].value || []);
    } catch (e) {
      console.error("Admin Refresh Error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    articles, setArticles,
    lessons, setLessons,
    testimonials, setTestimonials,
    consultations,
    categories,
    students, setStudents,
    quizzes, setQuizzes,
    loading,
    refresh
  };
};
