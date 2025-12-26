// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: ArticlesTab.tsx
// Причина: Удаление блокировки удаления системных страниц
// Файл: /src/components/admin/tabs/ArticlesTab.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useEffect, useCallback } from 'react';
import { Article, Category } from '../../../types';
import { api } from '../../../services/api';
import { Plus, FileText, Edit, Trash, RefreshCw } from 'lucide-react';
import ArticleEditor from '../ArticleEditor';
import { transliterate } from '../../../utils/stringUtils';

const ArticlesTab: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showEditor, setShowEditor] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Article>>({});

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
        const [artData, catData] = await Promise.all([
            api.articles.adminList(false),
            api.categories.list()
        ]);
        setArticles(artData || []);
        setCategories(catData || []);
    } catch (e) {
        console.error("Articles Load Error:", e);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleEdit = (item?: Article) => {
    setEditingItem(item ? { ...item } : { 
        title: '', slug: '', excerpt: '', content: '', published: false, 
        category: categories[0]?.name || 'Блог',
        is_lesson: false,
        publishedAt: new Date().toISOString()
    });
    setShowEditor(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        let finalSlug = editingItem.slug || transliterate(editingItem.title || '');
        let payload = { ...editingItem, slug: finalSlug, is_lesson: false } as Article;

        if (!payload.readingTime || payload.readingTime === 0) {
            const wordsCount = (payload.content || '').split(/\s+/).filter(Boolean).length;
            payload.readingTime = Math.max(1, Math.ceil(wordsCount / 200));
        }
        if (!payload.metaTitle) payload.metaTitle = payload.title;
        if (!payload.metaDescription) {
            const rawText = (payload.excerpt || payload.content || '').replace(/[#*`\[\]()]/g, '').trim();
            payload.metaDescription = rawText.substring(0, 160);
        }

        await (editingItem.id ? api.articles.update(editingItem.id, payload) : api.articles.create(payload));
        setShowEditor(false);
        refresh();
    } catch (e: any) { alert('Ошибка сохранения: ' + e.message); }
  };

  const handleDelete = async (article: Article) => {
      // ПРЕДОХРАНИТЕЛЬ УДАЛЕН: Теперь можно удалять любые страницы
      if (confirm('Удалить статью навсегда?')) { 
          await api.articles.delete(article.id); 
          refresh(); 
      }
  };

  if (loading && articles.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <RefreshCw size={48} className="animate-spin mb-4 text-gold" />
              <p className="font-bold text-xs uppercase tracking-widest">Загрузка блога...</p>
          </div>
      );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-xl font-bold text-dark">Статьи блога ({articles.length})</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Управление публичным контентом</p>
        </div>
        <button 
          onClick={() => handleEdit()} 
          className="bg-dark text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-black transition-all shadow-lg"
        >
          <Plus size={18} /> Создать статью
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {articles.map(a => (
          <div key={a.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-gold/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-50">
                {a.featuredImage ? <img src={a.featuredImage} className="w-full h-full object-cover" alt={a.title} /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><FileText size={24}/></div>}
              </div>
              <div>
                <h3 className="font-bold text-dark group-hover:text-gold transition-colors">{a.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                  <span className={`font-bold ${a.published ? 'text-green-500' : 'text-orange-500'}`}>{a.published ? 'Опубликовано' : 'Черновик'}</span>
                  <span>•</span>
                  <span className="bg-gray-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{a.category}</span>
                  {a.is_featured_news && <span className="text-red-500 font-bold text-[10px] uppercase">● Pulse</span>}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(a)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={20}/></button>
              <button onClick={() => handleDelete(a)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash size={20}/></button>
            </div>
          </div>
        ))}
      </div>

      <ArticleEditor 
        show={showEditor} 
        onClose={() => setShowEditor(false)} 
        onSave={handleSave} 
        item={editingItem} 
        setItem={setEditingItem} 
        editorType="article" 
        categories={categories} 
      />
    </>
  );
};

export default ArticlesTab;