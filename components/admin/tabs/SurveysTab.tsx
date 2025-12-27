// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: SurveysTab.tsx
// Причина: Управление опросами (диагностиками) в админке
// Файл: /src/components/admin/tabs/SurveysTab.tsx
// Статус: создан
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useEffect, useCallback } from 'react';
import { Survey } from '../../../types';
import { api } from '../../../services/api';
import { Plus, Edit, Trash, Copy, Check, BarChart3, RefreshCw } from 'lucide-react';
import SurveyEditor from '../SurveyEditor';

const SurveysTab: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [showEditor, setShowEditor] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Survey>>({});

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
        const data = await api.surveys.list();
        setSurveys(data || []);
    } catch (e) {
        console.error("Surveys Load Error:", e);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const copyToClipboard = (id: string) => {
    const text = `[survey:${id}]`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEdit = (item?: Survey) => {
      setEditingItem(item ? { ...item } : { title: '', statements: [] });
      setShowEditor(true);
  };

  const handleDelete = async (id: string) => {
      if (confirm('Удалить опрос навсегда?')) {
          await api.surveys.delete(id);
          refresh();
      }
  };

  if (loading && surveys.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <RefreshCw size={48} className="animate-spin mb-4 text-gold" />
              <p className="font-bold text-xs uppercase tracking-widest">Загрузка опросов...</p>
          </div>
      );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-dark">Опросы и Диагностики ({surveys.length})</h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Оценка состояний студентов</p>
        </div>
        <button 
          onClick={() => handleEdit()} 
          className="bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg"
        >
          <Plus size={18} /> Создать опрос
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {surveys.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-200 transition-all flex flex-col group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-dark group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.statements?.length || 0} утверждений</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash size={18} /></button>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest mb-1">ID для вставки:</span>
                <code className="text-[10px] bg-gray-50 px-2 py-1 rounded text-dark font-mono border border-gray-100">[survey:{item.id}]</code>
              </div>
              <button 
                onClick={() => copyToClipboard(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${copiedId === item.id ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 hover:bg-indigo-50 hover:text-indigo-700'}`}
              >
                {copiedId === item.id ? <Check size={12} /> : <Copy size={12} />}
                {copiedId === item.id ? 'Скопировано' : 'Копировать'}
              </button>
            </div>
          </div>
        ))}

        {surveys.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <BarChart3 size={32} />
             </div>
             <p className="text-gray-400 italic">Опросов пока нет.</p>
          </div>
        )}
      </div>

      <SurveyEditor 
        show={showEditor} 
        onClose={() => setShowEditor(false)} 
        onSave={() => { setShowEditor(false); refresh(); }} 
        item={editingItem} 
      />
    </div>
  );
};

export default SurveysTab;