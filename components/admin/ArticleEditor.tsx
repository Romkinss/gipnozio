
import React, { useState, useRef } from 'react';
import { X, Upload, Loader2, Image as ImageIcon, Sparkles, Calendar as CalendarIcon, Link as LinkIcon } from 'lucide-react';
import { Article, Category } from '../../types';
import { api } from '../../services/api';
import { convertToWebP } from '../../utils/imageOptimizer';

interface ArticleEditorProps {
    show: boolean;
    onClose: () => void;
    onSave: (e: React.FormEvent) => void;
    item: Partial<Article>;
    setItem: (item: Partial<Article>) => void;
    editorType: 'article' | 'lesson';
    categories: Category[];
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({ show, onClose, onSave, item, setItem, editorType, categories }) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!show) return null;

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const optimizedFile = await convertToWebP(file);
            const attachment = await api.storage.upload(optimizedFile);
            setItem({ ...item, featuredImage: attachment.url });
        } catch (error: any) {
            console.error('Upload failed:', error);
            alert('Ошибка при загрузке изображения: ' + error.message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="fixed inset-0 bg-dark/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-fade-in-up border border-gray-100">
                <div className={`p-6 border-b border-gray-100 flex justify-between items-center ${editorType === 'lesson' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                    <h3 className="text-xl font-bold font-serif text-dark">
                        {item.id ? 'Редактировать' : 'Создать'} {editorType === 'lesson' ? 'урок' : 'статью'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-dark p-2 hover:bg-white/50 rounded-full transition-all"><X /></button>
                </div>
                
                <div className="overflow-y-auto p-6 md:p-10 flex-1 bg-white">
                    <form id="editorForm" onSubmit={onSave} className="space-y-12 max-w-5xl mx-auto">
                        
                        {/* News Settings Section */}
                        {editorType === 'article' && (
                            <section className="bg-gold/5 p-6 rounded-2xl border border-gold/10 space-y-6">
                                <div className="flex items-center gap-3 border-b border-gold/10 pb-4">
                                    <Sparkles className="text-gold" size={20} />
                                    <h4 className="text-sm font-bold text-dark uppercase tracking-widest">Настройки "Academy Pulse"</h4>
                                    <div className="ml-auto flex items-center gap-2">
                                        <input type="checkbox" id="pulse" className="w-4 h-4 accent-gold" checked={item.is_featured_news || false} onChange={e => setItem({...item, is_featured_news: e.target.checked})} />
                                        <label htmlFor="pulse" className="text-xs font-bold text-gold uppercase cursor-pointer">Вывести на главную</label>
                                    </div>
                                </div>
                                
                                {item.is_featured_news && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Тип маркера</label>
                                            <select className="w-full bg-white border border-gray-100 p-2.5 rounded-xl text-sm outline-none focus:border-gold" value={item.marker_type || 'insight'} onChange={e => setItem({...item, marker_type: e.target.value as any})}>
                                                <option value="live">🔴 LIVE</option>
                                                <option value="ceremony">🍵 CEREMONY</option>
                                                <option value="podcast">🎙️ PODCAST</option>
                                                <option value="lesson">🎓 NEW LESSON</option>
                                                <option value="meetup">🤝 MEETUP</option>
                                                <option value="case">🔥 CASE STUDY</option>
                                                <option value="insight">📝 INSIGHT</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Дата события</label>
                                            <div className="relative">
                                                <CalendarIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type="date" className="w-full bg-white border border-gray-100 p-2.5 pl-9 rounded-xl text-sm" value={item.event_date || ''} onChange={e => setItem({...item, event_date: e.target.value})} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Время события</label>
                                            <input type="text" placeholder="19:00 МСК" className="w-full bg-white border border-gray-100 p-2.5 rounded-xl text-sm" value={item.event_time || ''} onChange={e => setItem({...item, event_time: e.target.value})} />
                                        </div>
                                        <div className="md:col-span-3">
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Внешняя ссылка (например, на Бот)</label>
                                            <div className="relative">
                                                <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type="text" placeholder="https://t.me/gipnozio_bot?start=event" className="w-full bg-white border border-gray-100 p-2.5 pl-9 rounded-xl text-sm" value={item.external_url || ''} onChange={e => setItem({...item, external_url: e.target.value})} />
                                            </div>
                                            <p className="text-[9px] text-gray-400 mt-2 italic">* Если заполнено, клик в ленте перенаправит пользователя по этой ссылке вместо статьи.</p>
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Standard Editor Fields */}
                        <section className="space-y-6">
                            <h4 className="text-xs font-bold text-gold uppercase tracking-widest border-b border-gold/10 pb-2">Основные данные</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Заголовок</label>
                                    <input className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:bg-white focus:border-gold outline-none transition-all font-serif text-xl font-bold" value={item.title || ''} onChange={e => setItem({...item, title: e.target.value})} required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Slug (URL путь)</label>
                                    <input className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:bg-white focus:border-gold outline-none text-sm font-mono" value={item.slug || ''} onChange={e => setItem({...item, slug: e.target.value})} placeholder="avto-transliteraciya" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Категория</label>
                                    <select className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:bg-white focus:border-gold outline-none text-sm" value={item.category || ''} onChange={e => setItem({...item, category: e.target.value})}>
                                        <option value="Урок">Урок</option>
                                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>

                                {editorType === 'lesson' && (
                                    <>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Модуль #</label>
                                            <input type="number" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl" value={item.module_number || 1} onChange={e => setItem({...item, module_number: parseInt(e.target.value)})} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Порядок урока</label>
                                            <input type="number" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl" value={item.lesson_order || 1} onChange={e => setItem({...item, lesson_order: parseInt(e.target.value)})} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Уровень доступа (1-4)</label>
                                            <input type="number" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl" value={item.access_level || 1} onChange={e => setItem({...item, access_level: parseInt(e.target.value)})} />
                                        </div>
                                    </>
                                )}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Время чтения (мин)</label>
                                    <input type="number" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl" value={item.readingTime || 5} onChange={e => setItem({...item, readingTime: parseInt(e.target.value)})} />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h4 className="text-xs font-bold text-gold uppercase tracking-widest border-b border-gold/10 pb-2">Контент</h4>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Краткий анонс (Excerpt)</label>
                                <textarea className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl h-24 text-sm focus:bg-white outline-none" value={item.excerpt || ''} onChange={e => setItem({...item, excerpt: e.target.value})}></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Полный текст (Markdown)</label>
                                <textarea className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl h-[400px] font-mono text-sm leading-relaxed focus:bg-white outline-none" value={item.content || ''} onChange={e => setItem({...item, content: e.target.value})} required></textarea>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h4 className="text-xs font-bold text-gold uppercase tracking-widest border-b border-gold/10 pb-2">SEO & Мета-данные</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Meta Title</label>
                                    <input className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm" value={item.metaTitle || ''} onChange={e => setItem({...item, metaTitle: e.target.value})} placeholder="SEO Заголовок" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Теги (через запятую)</label>
                                    <input className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm" value={item.tags || ''} onChange={e => setItem({...item, tags: e.target.value})} placeholder="гипноз, обучение, практика" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Meta Description</label>
                                    <textarea className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl h-20 text-sm" value={item.metaDescription || ''} onChange={e => setItem({...item, metaDescription: e.target.value})} placeholder="SEO Описание для поиска"></textarea>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h4 className="text-xs font-bold text-gold uppercase tracking-widest border-b border-gold/10 pb-2">Изображение обложки</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Обложка</label>
                                    <div className="flex flex-col md:flex-row gap-4 items-start">
                                        <div className="flex-1 w-full space-y-3">
                                            <div className="flex gap-2">
                                                <input 
                                                    className="flex-1 bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm focus:bg-white outline-none" 
                                                    value={item.featuredImage || ''} 
                                                    onChange={e => setItem({...item, featuredImage: e.target.value})} 
                                                    placeholder="URL изображения (https://...)" 
                                                />
                                                <input 
                                                    type="file" 
                                                    ref={fileInputRef}
                                                    onChange={handleFileUpload}
                                                    accept="image/*"
                                                    className="hidden" 
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    disabled={uploading}
                                                    className="px-4 py-3 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest whitespace-nowrap disabled:opacity-50"
                                                >
                                                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                                                    {uploading ? 'Загрузка...' : 'Загрузить файл'}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {item.featuredImage && (
                                            <div className="w-full md:w-48 aspect-video rounded-xl border border-gray-100 overflow-hidden bg-gray-50 relative group">
                                                <img src={item.featuredImage} className="w-full h-full object-cover" alt="Preview" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Alt-текст изображения</label>
                                    <input className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm" value={item.featuredImageAlt || ''} onChange={e => setItem({...item, featuredImageAlt: e.target.value})} placeholder="Описание для доступности (важно для SEO)" />
                                </div>
                            </div>
                        </section>

                        <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="pub" className="w-5 h-5 accent-gold cursor-pointer" checked={item.published || false} onChange={e => setItem({...item, published: e.target.checked})} />
                                <label htmlFor="pub" className="font-bold text-dark cursor-pointer select-none uppercase text-xs tracking-widest">Опубликовать</label>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
                    <button type="button" onClick={onClose} className="px-8 py-3 text-gray-500 font-bold hover:text-dark transition-colors">Отмена</button>
                    <button type="submit" form="editorForm" className="px-10 py-3 bg-dark text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg">Сохранить</button>
                </div>
            </div>
        </div>
    );
};

export default ArticleEditor;
