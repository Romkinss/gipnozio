// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: LessonEditor.tsx
// Причина: Добавление поля "Теги" для управления бейджами в LMS
// Файл: /src/components/admin/LessonEditor.tsx
// Статус: доработан
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useRef } from 'react';
import { X, Upload, Loader2, FileText, Paperclip, Trash2, Music, FileBox, Hash } from 'lucide-react';
import { Article, Category, Attachment } from '../../types';
import { api } from '../../services/api';
import { convertToWebP } from '../../utils/imageOptimizer';

interface LessonEditorProps {
    show: boolean;
    onClose: () => void;
    onSave: (e: React.FormEvent) => void;
    item: Partial<Article>;
    setItem: (item: Partial<Article>) => void;
    editorType: 'article' | 'lesson';
    categories: Category[];
}

const LessonEditor: React.FC<LessonEditorProps> = ({ show, onClose, onSave, item, setItem, editorType, categories }) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!show) return null;

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            let fileToUpload = file;
            
            // Оптимизируем только если это картинка (для экономии места в Supabase)
            if (file.type.startsWith('image/') && !file.type.includes('svg')) {
                 fileToUpload = await convertToWebP(file);
            }
            
            // Загружаем файл в облако
            const uploaded = await api.storage.upload(fileToUpload, 'public-images');
            
            // Формируем объект вложения
            const newAttachment: Attachment = {
                id: crypto.randomUUID(),
                name: file.name,
                url: uploaded.url,
                size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                type: file.type
            };

            const currentAttachments = item.attachments || [];
            setItem({ 
                ...item, 
                attachments: [...currentAttachments, newAttachment] 
            });
            
        } catch (error: any) {
            console.error('Upload failed:', error);
            alert('Ошибка при загрузке файла: ' + error.message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const removeAttachment = (id: string) => {
        const current = item.attachments || [];
        setItem({
            ...item,
            attachments: current.filter(a => a.id !== id)
        });
    };

    const getFileIcon = (type?: string) => {
        if (!type) return <FileText size={18} />;
        if (type.includes('audio')) return <Music size={18} className="text-purple-500" />;
        if (type.includes('pdf')) return <FileText size={18} className="text-red-500" />;
        if (type.includes('image')) return <FileBox size={18} className="text-blue-500" />;
        return <Paperclip size={18} className="text-gray-500" />;
    };

    return (
        <div className="fixed inset-0 bg-dark/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-fade-in-up border border-gray-100">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-50">
                    <h3 className="text-xl font-bold font-serif text-dark">
                        {item.id ? 'Редактировать' : 'Создать'} учебный материал
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-dark p-2 hover:bg-white/50 rounded-full transition-all"><X /></button>
                </div>
                
                <div className="overflow-y-auto p-6 md:p-10 flex-1 bg-white">
                    <form id="editorForm" onSubmit={onSave} className="space-y-12 max-w-5xl mx-auto">
                        
                        {/* Основные данные */}
                        <section className="space-y-6">
                            <h4 className="text-xs font-bold text-gold uppercase tracking-widest border-b border-gold/10 pb-2">Данные урока</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Название урока</label>
                                    <input className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:bg-white focus:border-gold outline-none transition-all font-serif text-xl font-bold" value={item.title || ''} onChange={e => setItem({...item, title: e.target.value})} required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Slug (Путь)</label>
                                    <input className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:bg-white focus:border-gold outline-none text-sm font-mono" value={item.slug || ''} onChange={e => setItem({...item, slug: e.target.value})} />
                                </div>
                                
                                {/* Поле Теги (Hashtags) для бейджей в LMS */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Бейджи (через запятую)</label>
                                    <div className="relative">
                                        <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input 
                                            className="w-full bg-gray-50 border border-gray-100 p-3 pl-9 rounded-xl focus:bg-white focus:border-gold outline-none text-sm" 
                                            value={item.tags || ''} 
                                            onChange={e => setItem({...item, tags: e.target.value})} 
                                            placeholder="Видео, Тест, Конспект..."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 md:col-span-2">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Модуль</label>
                                        <input type="number" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl" value={item.module_number || 1} onChange={e => setItem({...item, module_number: parseInt(e.target.value)})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Порядок</label>
                                        <input type="number" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl" value={item.lesson_order || 1} onChange={e => setItem({...item, lesson_order: parseInt(e.target.value)})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Доступ</label>
                                        <input type="number" className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl" value={item.access_level || 1} onChange={e => setItem({...item, access_level: parseInt(e.target.value)})} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Материалы для скачивания (Вложения) */}
                        <section className="space-y-6">
                            <div className="flex items-center justify-between border-b border-gold/10 pb-2">
                                <h4 className="text-xs font-bold text-gold uppercase tracking-widest">Материалы для скачивания</h4>
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept="*" 
                                    className="hidden" 
                                />
                                <button 
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50 shadow-md"
                                >
                                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                                    {uploading ? 'Загрузка...' : 'Добавить файл'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {item.attachments && item.attachments.length > 0 ? (
                                    item.attachments.map((file) => (
                                        <div key={file.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-gray-400">
                                                {getFileIcon(file.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold text-dark truncate" title={file.name}>{file.name}</div>
                                                <div className="text-[10px] text-gray-400 font-medium uppercase">{file.size || '0.00 MB'}</div>
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={() => removeAttachment(file.id)}
                                                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-300">
                                        <Paperclip size={32} className="mb-2 opacity-20" />
                                        <p className="text-xs font-bold uppercase tracking-widest">Нет прикрепленных файлов</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h4 className="text-xs font-bold text-gold uppercase tracking-widest border-b border-gold/10 pb-2">Контент урока</h4>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Полный текст и Видео (Markdown)</label>
                                <textarea className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl h-[400px] font-mono text-sm leading-relaxed focus:bg-white outline-none" value={item.content || ''} onChange={e => setItem({...item, content: e.target.value})} placeholder="[video](url)..." required></textarea>
                            </div>
                            <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" id="pub-lesson" className="w-5 h-5 accent-gold cursor-pointer" checked={item.published || false} onChange={e => setItem({...item, published: e.target.checked})} />
                                    <label htmlFor="pub-lesson" className="font-bold text-dark cursor-pointer select-none uppercase text-xs tracking-widest">Опубликовать в LMS</label>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
                    <button type="button" onClick={onClose} className="px-8 py-3 text-gray-500 font-bold hover:text-dark transition-colors">Отмена</button>
                    <button type="submit" form="editorForm" className="px-10 py-3 bg-dark text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg">Сохранить урок</button>
                </div>
            </div>
        </div>
    );
};

export default LessonEditor;