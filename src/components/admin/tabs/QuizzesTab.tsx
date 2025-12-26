// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: QuizzesTab.tsx
// Причина: изоляция логики управления тестами
// Файл: /src/components/admin/tabs/QuizzesTab.tsx
// Статус: изменяется (автономизация)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useEffect, useCallback } from 'react';
import { Quiz } from '../../../types';
import { api } from '../../../services/api';
import { Plus, Edit, Trash, Copy, Check, HelpCircle, RefreshCw } from 'lucide-react';
import QuizEditor from '../QuizEditor';

const QuizzesTab: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [showEditor, setShowEditor] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Partial<Quiz>>({});

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
        const data = await api.quizzes.list();
        setQuizzes(data || []);
    } catch (e) {
        console.error("Quizzes Load Error:", e);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const copyToClipboard = (id: string) => {
    const text = `[quiz:${id}]`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEdit = (quiz?: Quiz) => {
      setEditingQuiz(quiz ? { ...quiz } : { title: '', data: [] });
      setShowEditor(true);
  };

  const handleDelete = async (id: string) => {
      if (confirm('Удалить квиз навсегда? Это может сломать уроки, где он используется.')) {
          await api.quizzes.delete(id);
          refresh();
      }
  };

  if (loading && quizzes.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <RefreshCw size={48} className="animate-spin mb-4 text-gold" />
              <p className="font-bold text-xs uppercase tracking-widest">Загрузка тестов...</p>
          </div>
      );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-dark">Квизы ({quizzes.length})</h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Управление тестами самопроверки</p>
        </div>
        <button 
          onClick={() => handleEdit()} 
          className="bg-dark text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-black transition-all shadow-lg"
        >
          <Plus size={18} /> Создать квиз
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-gold/30 transition-all flex flex-col group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-xl flex items-center justify-center">
                  <HelpCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-dark group-hover:text-gold transition-colors">{quiz.title}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{quiz.data?.length || 0} вопросов</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(quiz)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Редактировать">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(quiz.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Удалить">
                  <Trash size={18} />
                </button>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest mb-1">ID для вставки в урок:</span>
                <code className="text-[10px] bg-gray-50 px-2 py-1 rounded text-dark font-mono border border-gray-100">[quiz:{quiz.id}]</code>
              </div>
              <button 
                onClick={() => copyToClipboard(quiz.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${copiedId === quiz.id ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 hover:bg-gold/10 hover:text-gold-dark'}`}
              >
                {copiedId === quiz.id ? <Check size={12} /> : <Copy size={12} />}
                {copiedId === quiz.id ? 'Скопировано' : 'Копировать'}
              </button>
            </div>
          </div>
        ))}

        {quizzes.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <HelpCircle size={32} />
             </div>
             <p className="text-gray-400 italic">Квизов пока нет. Нажмите «Создать квиз».</p>
          </div>
        )}
      </div>

      <QuizEditor 
        show={showEditor} 
        onClose={() => setShowEditor(false)} 
        onSave={() => { setShowEditor(false); refresh(); }} 
        item={editingQuiz} 
      />
    </div>
  );
};

export default QuizzesTab;