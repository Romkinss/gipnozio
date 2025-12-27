import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Article } from '../types';
import { formatContent, slugifyHeader } from '../utils/markdownFormatter';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import PublicLayout from '../components/PublicLayout';
import SEO from '../components/SEO';
import TableOfContents, { TocItem } from '../components/TableOfContents';
import AuthorBio from '../components/AuthorBio';
import ShareButtons from '../components/ShareButtons';
import Breadcrumbs from '../components/Breadcrumbs';
import DOMPurify from 'dompurify';
import { Calendar, Clock, FileX, List, Feather, ChevronRight } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const isLegalDoc = useMemo(() => slug === 'policy' || slug === 'terms', [slug]);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      window.scrollTo(0, 0);
      
      api.articles.get(slug).then(async data => {
        if (data) {
            setArticle(data);
            setLoading(false);
            if (!isLegalDoc) {
                api.articles.getRelated(data.slug, data.category).then(setRelatedArticles);
            }
        } else {
            const checkPath = `blog/${slug}`;
            const redirect = await api.redirects.get(checkPath);
            if (redirect) {
                navigate('/' + redirect.to_path, { replace: true });
            } else {
                setLoading(false);
            }
        }
      });
    }
  }, [slug, navigate, isLegalDoc]);

  useEffect(() => {
    if (!loading && article) {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        iframe.removeAttribute('width');
        iframe.removeAttribute('height');
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
      });
    }
  }, [loading, article]);

  const tocHeaders = useMemo(() => {
      if (!article?.content || isLegalDoc) return [];
      
      const headers: TocItem[] = [];
      const lines = article.content.split('\n');
      
      lines.forEach(line => {
          const match = line.match(/^#{2,3}\s+(.+)$/);
          if (match) {
              const level = line.startsWith('###') ? 3 : 2;
              const text = match[1].trim();
              const id = slugifyHeader(text);
              headers.push({ id, text, level });
          }
      });
      
      return headers;
  }, [article?.content, isLegalDoc]);

  if (loading) return (
    <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
        </div>
    </PublicLayout>
  );

  if (!article) return (
      <PublicLayout>
          <SEO title="Статья не найдена" noindex={true} />
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
            <FileX className="text-gray-300 mb-4" size={64} />
            <h1 className="text-3xl font-serif font-bold text-dark mb-2">Статья не найдена</h1>
            <Link to="/blog" className="text-gold hover:underline">Вернуться в блог</Link>
          </div>
      </PublicLayout>
  );

  const tags = article.tags ? article.tags.split(',').map(t => t.trim()) : [];
  const currentUrl = window.location.href;
  
  const breadcrumbItems = [
      { label: 'Главная', path: '/' },
      { label: 'Блог', path: '/blog' },
      { label: article.title, path: `/blog/${article.slug}` }
  ];

  const cleanContent = DOMPurify.sanitize(formatContent(article.content), {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'style']
  });

  if (isLegalDoc) {
    return (
        <PublicLayout>
            <SEO 
                title={article.title}
                description={article.excerpt}
                url={`/blog/${article.slug}`}
                type="article"
                publishedAt={article.publishedAt}
            />
            <div className="bg-white min-h-screen py-16 md:py-24">
                <article className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-dark leading-tight mb-12 text-center">
                        {article.title}
                    </h1>
                    <div 
                        className="article-content legal-doc-style"
                        dangerouslySetInnerHTML={{ __html: cleanContent }}
                    />
                    <div className="mt-16 pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
                        Официальный документ GIPNOZIO Academy. Дата обновления: {format(new Date(article.publishedAt), 'dd.MM.yyyy')}
                    </div>
                </article>
            </div>
        </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <SEO 
        title={article.title}
        description={article.excerpt}
        image={article.featuredImage}
        url={`/blog/${article.slug}`}
        type="article"
        keywords={article.tags}
        publishedAt={article.publishedAt}
        breadcrumbs={breadcrumbItems}
      />
      
      <div className="bg-white min-h-screen">
         <div className="border-b border-gray-100">
             <div className="container mx-auto px-4 py-12 max-w-5xl">
                 <div className="mb-8">
                    <Breadcrumbs items={breadcrumbItems} />
                 </div>

                 {article.category && (
                     <span className="inline-block bg-gold/10 text-gold-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        {article.category}
                     </span>
                 )}

                 <h1 className="text-3xl md:text-5xl font-serif font-bold text-dark leading-tight mb-6 max-w-4xl">{article.title}</h1>
                 
                 {article.excerpt && (
                    <p className="text-xl text-gray-600 font-light leading-relaxed mb-8 max-w-4xl">{article.excerpt}</p>
                 )}

                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-gray-100 pt-6">
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Calendar className="text-gold" size={16} />
                            <time dateTime={new Date(article.publishedAt).toISOString()} itemProp="datePublished">
                                {format(new Date(article.publishedAt), 'd MMMM yyyy', { locale: ru })}
                            </time>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="text-gold" size={16} />
                            {article.readingTime || 5} мин чтения
                        </div>
                    </div>
                    <ShareButtons title={article.title} url={currentUrl} />
                 </div>
             </div>
         </div>

         {article.featuredImage && (
             <div className="container mx-auto px-4 max-w-6xl -mt-0 mb-12">
                 <img 
                    src={article.featuredImage} 
                    alt={article.featuredImageAlt || article.title} 
                    className="w-full h-auto rounded-xl shadow-lg" 
                 />
             </div>
         )}

         <div className="container mx-auto px-4 max-w-6xl pb-20">
             <div className="grid lg:grid-cols-[1fr_280px] gap-12">
                 <div className="min-w-0">
                     <div className="lg:hidden mb-8">
                        {tocHeaders.length > 1 && (
                            <details className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <summary className="font-bold text-dark cursor-pointer flex items-center gap-2">
                                    <List className="text-gold" size={18} /> Содержание статьи
                                </summary>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <ul className="space-y-3">
                                        {tocHeaders.map(h => (
                                            <li key={h.id} style={{ paddingLeft: h.level === 3 ? '1rem' : '0' }}>
                                                <a href={`#${h.id}`} className="text-sm text-gray-600 hover:text-gold block">
                                                    {h.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </details>
                        )}
                     </div>

                     <div 
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: cleanContent }}
                     />

                     {tags.length > 0 && (
                         <div className="mt-12 pt-8 border-t border-gray-100">
                             <h4 className="text-sm font-bold uppercase text-gray-400 mb-4">Теги статьи:</h4>
                             <div className="flex flex-wrap gap-2">
                                 {tags.map((tag, i) => (
                                     <span key={i} className="px-3 py-1 bg-gold/10 text-gold-dark rounded-full text-sm border border-gold/10">
                                         #{tag}
                                     </span>
                                 ))}
                             </div>
                         </div>
                     )}
                     
                     <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <span className="font-serif font-bold text-lg text-dark">Понравилась статья? Поделитесь:</span>
                        <ShareButtons title={article.title} url={currentUrl} />
                     </div>

                     <AuthorBio />
                 </div>

                 <aside className="hidden lg:block relative">
                     <div className="sticky top-24 space-y-8">
                         <TableOfContents headers={tocHeaders} />
                         <div className="bg-dark text-white p-6 rounded-xl text-center relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
                             <h4 className="font-serif font-bold text-xl mb-3">Хотите освоить гипноз?</h4>
                             <p className="text-sm text-gray-300 mb-4">Получите бесплатный доступ к первому модулю обучения.</p>
                             <Link to="/login" className="block w-full py-2 bg-gold text-dark font-bold rounded hover:bg-white transition-colors text-sm">
                                 Попробовать
                             </Link>
                         </div>
                     </div>
                 </aside>
             </div>

             {relatedArticles.length > 0 && (
                <div className="mt-16 pt-12 border-t border-gray-100">
                    <h3 className="text-2xl font-serif font-bold text-dark mb-8">Вам может быть интересно</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {relatedArticles.map(rel => (
                            <Link key={rel.id} to={`/blog/${rel.slug}`} className="group block bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-gold/10 transition-all duration-300">
                                <div className="h-40 overflow-hidden relative">
                                    {rel.featuredImage ? (
                                        <img 
                                            src={rel.featuredImage} 
                                            alt={rel.featuredImageAlt || rel.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            loading="lazy" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <Feather className="text-gray-400" size={24} />
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h4 className="font-bold text-dark text-base mb-2 group-hover:text-gold-dark transition-colors line-clamp-2">
                                        {rel.title}
                                    </h4>
                                    <div className="text-xs text-gray-400 flex items-center gap-2">
                                        <Calendar size={12} />
                                        <time dateTime={new Date(rel.publishedAt).toISOString()}>
                                            {format(new Date(rel.publishedAt), 'd MMM yyyy', { locale: ru })}
                                        </time>
                                        <span>•</span>
                                        <span>{rel.readingTime || 5} мин</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
             )}
         </div>
      </div>
    </PublicLayout>
  );
};

export default BlogPost;