import { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import { Article, UserProfile, QuizResult } from '../types';

export const useLMSData = (user: UserProfile | null) => {
  const [modules, setModules] = useState<Record<number, Article[]>>({});
  const [progress, setProgress] = useState<string[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [allLessons, userProgress, results] = await Promise.all([
        api.learning.getModules(),
        api.learning.getProgress(user.telegram_id),
        api.quizzes.getResults(user.telegram_id)
      ]);

      const grouped: Record<number, Article[]> = {};
      allLessons.forEach(lesson => {
        const modNum = lesson.module_number || 1;
        if (!grouped[modNum]) grouped[modNum] = [];
        grouped[modNum].push(lesson);
      });

      setModules(grouped);
      setProgress(userProgress.map(p => p.lesson_id));
      setQuizResults(results);
    } catch (e) {
      console.error("LMS Data Fetch Error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [user?.telegram_id]);

  const nextLesson = useMemo(() => {
    if (Object.keys(modules).length === 0) return null;
    
    const allLessonsFlat = (Object.values(modules) as Article[][])
      .reduce((acc, val) => acc.concat(val), [] as Article[])
      .sort((a,b) => {
        const modDiff = (a.module_number || 0) - (b.module_number || 0);
        if (modDiff !== 0) return modDiff;
        return (a.lesson_order || 0) - (b.lesson_order || 0);
      });

    const found = allLessonsFlat.find(l => !progress.includes(l.id));
    return found || allLessonsFlat[allLessonsFlat.length - 1];
  }, [modules, progress]);

  return { modules, progress, quizResults, nextLesson, loading, refreshData };
};