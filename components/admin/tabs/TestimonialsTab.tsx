// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: TestimonialsTab.tsx
// Причина: Удаление кнопки ручного обновления данных для чистоты интерфейса
// Файл: /src/components/admin/tabs/TestimonialsTab.tsx
// Статус: изменено (удалена кнопка ручного обновления)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useEffect, useCallback } from 'react';
import { Testimonial } from '../../../types';
import { api } from '../../../services/api';
import { Plus, Video, Star, Edit, Trash, RefreshCw } from 'lucide-react';
import TestimonialEditor from '../TestimonialEditor';

const TestimonialsTab: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showEditor, setShowEditor] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial>>({});

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
        const data = await api.testimonials.adminList();
        setTestimonials(data || []);
    } catch (e) {
        console.error("Testimonials Load Error:", e);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleEdit = (item?: Testimonial) => {
      setEditingItem(item ? { ...item } : { 
          name: '', content: '', age: 0, profession: '', 
          rating: 5, type: 'image', mediaUrl: '', approved: true, featured: false 
      });
      setShowEditor(true);
  };

  const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          if (editingItem.id) {
              await api.testimonials.update(editingItem.id, editingItem);
          } else {
              await api.testimonials.create(editingItem);
          }
          setShowEditor(false);
          refresh();
      } catch (e: any) { alert('Ошибка сохранения отзыва: ' + e.message); }
  };

  const handleDelete = async (id: string) => {
      if (confirm('Удалить отзыв навсегда?')) {
          await api.testimonials.delete(id);
          refresh();
      }
  };

  const getReviewThumbnail = (t: Testimonial) => {
    if (t.thumbnailUrl) return t.thumbnailUrl;
    if (t.type === 'video' && t.mediaUrl?.includes('kinescope.io')) {
        const id = t.mediaUrl.split('/').pop();
        return `https://kinescope.io/${id}/poster`;
    }
    return t.mediaUrl || '';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h2 className="text-xl font-bold text-dark">Отзывы клиентов ({testimonials.length})</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Социальное доказательство академии</p>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={() => handleEdit()} 
                className="bg-gold text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-gold-dark transition-all shadow-lg"
            >
                <Plus size={18} /> Создать отзыв
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && testimonials.length === 0 ? (
           <div className="col-span-full py-20 text-center flex flex-col items-center gap-4">
               <RefreshCw size={48} className="animate-spin text-gold" />
               <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Загрузка данных...</p>
           </div>
        ) : (
            testimonials.map(t => (
            <div key={t.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative group hover:border-gold/30 transition-all flex flex-col">
                <div className="aspect-video bg-gray-100 rounded-xl mb-4 overflow-hidden relative border border-gray-50">
                {getReviewThumbnail(t) ? (
                    <img src={getReviewThumbnail(t)} className="w-full h-full object-cover" alt={t.name} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <Star size={40} />
                    </div>
                )}
                <div className="absolute inset-0 bg-dark/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                    <button onClick={() => handleEdit(t)} className="bg-white p-2 rounded-lg text-blue-500 shadow-lg hover:scale-110 transition-transform"><Edit size={18}/></button>
                    <button onClick={() => handleDelete(t.id)} className="bg-white p-2 rounded-lg text-red-500 shadow-lg hover:scale-110 transition-transform"><Trash size={18}/></button>
                    </div>
                </div>
                {t.type === 'video' && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-md shadow-sm">
                    <Video size={14}/>
                    </div>
                )}
                </div>
                <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="font-bold text-dark leading-none mb-1">{t.name}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{t.profession || 'Студент'}</p>
                </div>
                <div className="flex text-gold">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="#D4AF37" />)}
                </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 italic leading-relaxed flex-grow">"{t.content}"</p>
                <div className="mt-4 flex gap-2">
                {t.featured && <span className="bg-gold/10 text-gold-dark text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Избранный</span>}
                {t.approved ? <span className="bg-green-50 text-green-600 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Опубликован</span> : <span className="bg-orange-50 text-orange-600 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Скрыт</span>}
                </div>
            </div>
            ))
        )}
        {testimonials.length === 0 && !loading && (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <Star size={32} />
             </div>
             <p className="text-gray-400 italic">База отзывов пуста.</p>
          </div>
        )}
      </div>

      <TestimonialEditor 
        show={showEditor} 
        onClose={() => setShowEditor(false)} 
        onSave={handleSave} 
        item={editingItem} 
        setItem={setEditingItem} 
      />
    </div>
  );
};

export default TestimonialsTab;