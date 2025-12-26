// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: TestimonialEditor.tsx
// Причина: Добавление загрузки и оптимизации фото (до 5МБ, WebP)
// Файл: /src/components/admin/TestimonialEditor.tsx
// Статус: расширен
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useRef } from 'react';
import { X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { Testimonial } from '../../types/index';
import { api } from '../../services/api';
import { convertToWebP } from '../../utils/imageOptimizer';

interface TestimonialEditorProps {
    show: boolean;
    onClose: () => void;
    onSave: (e: React.FormEvent) => void;
    item: Partial<Testimonial>;
    setItem: (item: Partial<Testimonial>) => void;
}

const TestimonialEditor: React.FC<TestimonialEditorProps> = ({ show, onClose, onSave, item, setItem }) => {
    const [uploadingField, setUploadingField] = useState<'mediaUrl' | 'thumbnailUrl' | null>(null);
    const mediaInputRef = useRef<HTMLInputElement>(null);
    const thumbInputRef = useRef<HTMLInputElement>(null);

    if (!show) return null;

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'mediaUrl' | 'thumbnailUrl') => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Валидация размера (5 МБ)
        if (file.size > 5 * 1024 * 1024) {
            alert('Файл слишком большой. Максимальный размер 5 МБ.');
            return;
        }

        setUploadingField(field);
        try {
            // Оптимизация: конвертация в WebP и ресайз через существующую утилиту
            const optimizedFile = await convertToWebP(file);
            
            // Загрузка в Supabase Storage
            const attachment = await api.storage.upload(optimizedFile, 'public-images');
            
            // Обновление состояния формы
            setItem({ ...item, [field]: attachment.url });
        } catch (error: any) {
            console.error('Upload failed:', error);
            alert('Ошибка при загрузке изображения: ' + error.message);
        } finally {
            setUploadingField(null);
            // Очистка инпута для возможности повторной загрузки того же файла
            if (e.target) e.target.value = '';
        }
    };

    return (
        <div className="fixed inset-0 bg-dark/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col border border-gray-100">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-xl font-bold font-serif text-dark">
                        {item.id ? 'Редактировать отзыв' : 'Добавить отзыв'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-dark p-2 hover:bg-white/50 rounded-full transition-all"><X /></button>
                </div>
                
                <div className="overflow-y-auto p-8 flex-1">
                    <form id="testimonialForm" onSubmit={onSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Имя клиента</label>
                                <input className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:bg-white outline-none transition-all" value={item.name || ''} onChange={e => setItem({...item, name: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Профессия / Роль</label>
                                <input className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:bg-white outline-none transition-all" value={item.profession || ''} onChange={e => setItem({...item, profession: e.target.value})} placeholder="Психолог, Предприниматель" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Возраст</label>
                                <input type="number" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl" value={item.age || 0} onChange={e => setItem({...item, age: parseInt(e.target.value)})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Рейтинг (1-5)</label>
                                <input type="number" min="1" max="5" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl" value={item.rating || 5} onChange={e => setItem({...item, rating: parseInt(e.target.value)})} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Текст отзыва</label>
                            <textarea className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl h-32 focus:bg-white outline-none text-sm transition-all" value={item.content || ''} onChange={e => setItem({...item, content: e.target.value})} required></textarea>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Тип контента</label>
                                    <select className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl cursor-pointer" value={item.type || 'image'} onChange={e => setItem({...item, type: e.target.value as 'video' | 'image'})}>
                                        <option value="image">Фото (Скриншот)</option>
                                        <option value="video">Видео</option>
                                    </select>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <div className="flex items-center gap-3 mb-2">
                                        <input type="checkbox" id="test-featured" className="w-5 h-5 accent-gold cursor-pointer" checked={item.featured || false} onChange={e => setItem({...item, featured: e.target.checked})} />
                                        <label htmlFor="test-featured" className="text-xs font-bold text-gray-500 uppercase cursor-pointer select-none">Избранный</label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" id="test-approved" className="w-5 h-5 accent-gold cursor-pointer" checked={item.approved || false} onChange={e => setItem({...item, approved: e.target.checked})} />
                                        <label htmlFor="test-approved" className="text-xs font-bold text-gray-500 uppercase cursor-pointer select-none">Опубликован</label>
                                    </div>
                                </div>
                            </div>

                            {/* Поле Media URL с кнопкой загрузки */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                                    {item.type === 'video' ? 'URL Видео (Kinescope)' : 'Фото отзыва'}
                                </label>
                                <div className="flex gap-2">
                                    <input 
                                        className="flex-1 bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm focus:bg-white outline-none" 
                                        value={item.mediaUrl || ''} 
                                        onChange={e => setItem({...item, mediaUrl: e.target.value})} 
                                        placeholder="URL или загрузите файл..." 
                                    />
                                    {item.type === 'image' && (
                                        <>
                                            <input type="file" ref={mediaInputRef} className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'mediaUrl')} />
                                            <button 
                                                type="button" 
                                                onClick={() => mediaInputRef.current?.click()} 
                                                disabled={!!uploadingField}
                                                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest disabled:opacity-50 whitespace-nowrap"
                                            >
                                                {uploadingField === 'mediaUrl' ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                                                {uploadingField === 'mediaUrl' ? 'Загрузка...' : 'Загрузить фото'}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Поле Thumbnail URL с кнопкой загрузки (всегда доступно, особенно важно для видео) */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Превью (Thumbnail URL)</label>
                                <div className="flex gap-2">
                                    <input 
                                        className="flex-1 bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm focus:bg-white outline-none" 
                                        value={item.thumbnailUrl || ''} 
                                        onChange={e => setItem({...item, thumbnailUrl: e.target.value})} 
                                        placeholder="URL или загрузите превью..." 
                                    />
                                    <input type="file" ref={thumbInputRef} className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'thumbnailUrl')} />
                                    <button 
                                        type="button" 
                                        onClick={() => thumbInputRef.current?.click()} 
                                        disabled={!!uploadingField}
                                        className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest disabled:opacity-50 whitespace-nowrap"
                                    >
                                        {uploadingField === 'thumbnailUrl' ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                                        {uploadingField === 'thumbnailUrl' ? 'Загрузка...' : 'Загрузить превью'}
                                    </button>
                                </div>
                            </div>

                            {/* Превью текущего изображения */}
                            {(item.mediaUrl || item.thumbnailUrl) && (
                                <div className="flex gap-4">
                                    {item.mediaUrl && item.type === 'image' && (
                                        <div className="w-32 aspect-square rounded-xl border border-gray-100 overflow-hidden bg-gray-50 relative group">
                                            <img src={item.mediaUrl} className="w-full h-full object-cover" alt="Media Preview" />
                                            <div className="absolute inset-0 bg-dark/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[8px] text-white font-bold uppercase">Основное</span>
                                            </div>
                                        </div>
                                    )}
                                    {item.thumbnailUrl && (
                                        <div className="w-32 aspect-square rounded-xl border border-gray-100 overflow-hidden bg-gray-50 relative group">
                                            <img src={item.thumbnailUrl} className="w-full h-full object-cover" alt="Thumb Preview" />
                                            <div className="absolute inset-0 bg-dark/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[8px] text-white font-bold uppercase">Превью</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
                    <button type="button" onClick={onClose} className="px-8 py-3 text-gray-500 font-bold hover:text-dark transition-colors">Отмена</button>
                    <button type="submit" form="testimonialForm" className="px-10 py-3 bg-dark text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg">Сохранить</button>
                </div>
            </div>
        </div>
    );
};

export default TestimonialEditor;