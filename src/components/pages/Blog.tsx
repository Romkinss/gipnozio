import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Article, Category } from '../../types/index';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import PublicLayout from '../../PublicLayout';
import SEO from '../../SEO';
import Breadcrumbs from '../../Breadcrumbs';
import { Search, Calendar, Clock, Feather } from 'lucide-react';

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  
  const selectedCategorySlug = searchParams.get('category');

  useEffect(() => {
    api.categories.list().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    api.articles.list(search, selectedCategorySlug).then(data => {
        setArticles(data);
        setLoading(false);
    });
  }, [search, selectedCategorySlug]);

  const handleCategoryClick = (slug: string | null) => {
    if (slug) {
        setSearchParams({ category: slug });
    } else {
        setSearchParams({});
    }
  };

  const breadcrumbItems = [
      { label: 'Главная', path: '/' },
      { label: 'Блог', path: '/blog' }
  ];

  return (
    <PublicLayout>
        <SEO 
            title="Блог о психологии и гипнотерапии - GIPNOZIO"
            description="Статьи о работе с подсознанием, психосоматике, избавлении от страхов и личностном росте. Экспертные материалы от Романа Третьякова."
            url="/blog"
            breadcrumbs={breadcrumbItems}
        />
        
        <div className="bg-light border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-3">
                <Breadcrumbs items={breadcrumbItems} />
            </div>
        </div>

        <section className="py-16" style={{ background: 'var(--gradient-hero)' }}>
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-dark">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-dark to-gold">Блог</span> о психологии<br />и осознанности
                </h1>
                <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600">
                    Статьи о психологии, практики осознанности, методы работы с собой и профессиональные материалы от практикующего психолога и гипнотерапевта.
                </p>
            </div>
        </section>

        <section className="py-12 border-b border-gray-100 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="max-w-2xl mx-auto mb-8 relative">
                    <input 
                        type="text" 
                        placeholder="Поиск по статьям..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-6 py-4 rounded-lg border border-gray-200 focus:outline-none focus:border-gold shadow-sm text-lg pl-12"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                    <button 
                        onClick={() => handleCategoryClick(null)}
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${!selectedCategorySlug ? 'bg-gold text-white shadow-gold' : 'bg-white border border-gray-200 text-gray-600 hover:border-gold hover:text-gold-dark'}`}
                    >
                        Все статьи
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.slug)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${selectedCategorySlug === cat.slug ? 'bg-gold text-white shadow-gold' : 'bg-white border border-gray-200 text-gray-600 hover:border-gold hover:text-gold-dark'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-16 bg-light">
            <div className="max-w-6xl mx-auto px-4">
                {loading ? (
                    <div className="text-center py-20">
                         <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent mb-6"></div>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-20">
                        <Search className="mx-auto text-6xl text-gray-200 mb-6" size={64} />
                        <h3 className="text-2xl font-bold text-dark mb-2">Статьи не найдены</h3>
                        <p className="text-gray-500">Попробуйте изменить запрос</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <a key={article.id} href={`/blog/${article.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-gold transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
                                {article.featuredImage ? (
                                    <div className="h-56 overflow-hidden relative">
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-dark shadow-sm">
                                                {article.category || 'Блог'}
                                            </span>
                                        </div>
                                        <img 
                                            src={article.featuredImage} 
                                            alt={article.featuredImageAlt || article.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    </div>
                                ) : (
                                    <div className="h-56 bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center relative">
                                         <div className="absolute top-3 left-3 z-10">
                                            <span className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-dark shadow-sm">
                                                {article.category || 'Блог'}
                                            </span>
                                        </div>
                                        <Feather className="text-gold/30" size={48} />
                                    </div>
                                )}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-gold-dark transition-colors line-clamp-2 font-serif">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow font-light">
                                        {article.excerpt}
                                    </p>
                                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-medium uppercase tracking-wide">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            <time dateTime={new Date(article.publishedAt).toISOString()}>
                                                {format(new Date(article.publishedAt), 'd MMMM yyyy', { locale: ru })}
                                            </time>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} />
                                            {article.readingTime || 5} мин
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    </PublicLayout>
  );
};

export default Blog;