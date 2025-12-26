// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: LessonsTab.tsx
// Причина: Добавление индикации статуса публикации уроков
// Файл: /src/components/admin/tabs/LessonsTab.tsx
// Статус: изменяется
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useEffect, useCallback } from 'react';
import { Article, Category } from '../../../types';
import { api } from '../../../services/api';
import { Plus, Edit, Trash, RefreshCw } from 'lucide-react';
import LessonEditor from '../LessonEditor';
import { transliterate } from '../../../utils/stringUtils';

const LessonsTab: React.FC = () => {
  const [lessons, setLessons] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showEditor, setShowEditor] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Article>>({});

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
        const data = await api.articles.adminList(true);
        setLessons(data || []);
    } catch (e) {
        console.error("Lessons Load Error:", e);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleEdit = (item?: Article) => {
    setEditingItem(item ? { ...item } : { 
        title: '', slug: '', excerpt: '', content: '', published: false, 
        category: 'Урок',
        is_lesson: true, module_number: 1, lesson_order: 1, access_level: 1,
        publishedAt: new Date().toISOString()
    });
    setShowEditor(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        let finalSlug = editingItem.slug || transliterate(editingItem.title || '');
        let payload = { ...editingItem, slug: finalSlug, is_lesson: true } as Article;

        await (editingItem.id ? api.articles.update(editingItem.id, payload) : api.articles.create(payload));
        setShowEditor(false);
        refresh();
    } catch (e: any) { alert('Ошибка сохранения урока: ' + e.message); }
  };

  const handleDelete = async (article: Article) => {
      if (confirm('Удалить урок навсегда?')) { 
          await api.articles.delete(article.id); 
          refresh(); 
      }
  };

  const modulesCount = [1,2,3,4,5,6,7,8,9,10,11,12];

  if (loading && lessons.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <RefreshCw size={48} className="animate-spin mb-4 text-gold" />
              <p className="font-bold text-xs uppercase tracking-widest">Загрузка программы обучения...</p>
          </div>
      );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-xl font-bold text-dark">Уроки курса ({lessons.length})</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Структура обучающей программы</p>
        </div>
        <button 
          onClick={() => handleEdit()} 
          className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg"
        >
          <Plus size={18} /> Добавить урок
        </button>
      </div>

      <div className="space-y-8">
        {modulesCount.map(m => {
          const modLessons = lessons.filter(l => l.module_number === m);
          if (modLessons.length === 0) return null;
          return (
            <div key={m} className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest">Модуль {m}</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {modLessons.map(l => (
                  <div key={l.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-blue-500 font-bold w-6 text-center text-sm">{l.lesson_order}.</div>
                      <div>
                        <div className="font-bold text-dark text-sm">{l.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-[9px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded border border-gray-200">LV.{l.access_level}</div>
                          <span className={`text-[9px] font-bold uppercase tracking-tighter ${l.published ? 'text-green-500' : 'text-orange-500'}`}>
                            {l.published ? '● Опубликован' : '○ Черновик'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(l)} className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"><Edit size={18}/></button>
                      <button onClick={() => handleDelete(l)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash size={18}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <LessonEditor 
        show={showEditor} 
        onClose={() => setShowEditor(false)} 
        onSave={handleSave} 
        item={editingItem} 
        setItem={setEditingItem} 
        editorType="lesson" 
        categories={[]} 
      />
    </>
  );
};

export default LessonsTab;