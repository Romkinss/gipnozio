import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, User, Clock, Tag } from 'lucide-react';

interface BlogPostProps {
  title: string;
  author: string;
  publishedAt: Date;
  category?: string;
  tags?: string[];
  readingTime?: number;
  content: string;
  previousPost?: {
    slug: string;
    title: string;
  };
  nextPost?: {
    slug: string;
    title: string;
  };
}

export default function BlogPostView({
  title,
  author,
  publishedAt,
  category,
  tags,
  readingTime,
  content,
  previousPost,
  nextPost,
}: BlogPostProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        {category && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium">
              {category}
            </span>
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
          {title}
        </h1>

        {/* Meta information */}
        <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <User size={18} />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{formattedDate}</span>
          </div>
          {readingTime && (
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{readingTime} мин. чтения</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <a
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition"
              >
                <Tag size={14} />
                {tag}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Divider */}
      <div className="border-t border-gray-200 my-8"></div>

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-8"></div>

      {/* Author bio */}
      <div className="bg-gray-50 rounded-lg p-6 mb-12">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gold rounded-full flex-shrink-0"></div>
          <div>
            <h3 className="font-serif font-bold text-lg text-dark mb-2">
              {author}
            </h3>
            <p className="text-gray-600">
              Специалист по гипнотерапии и личностному развитию. Помогаю людям достичь своих целей через работу с подсознанием.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {previousPost ? (
          <a
            href={`/blog/${previousPost.slug}`}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-gold hover:bg-gold/5 transition group"
          >
            <ChevronLeft className="text-gold group-hover:translate-x-[-4px] transition" size={20} />
            <div className="text-left">
              <div className="text-sm text-gray-600">Предыдущая статья</div>
              <div className="font-semibold text-dark group-hover:text-gold transition">
                {previousPost.title}
              </div>
            </div>
          </a>
        ) : (
          <div></div>
        )}

        {nextPost ? (
          <a
            href={`/blog/${nextPost.slug}`}
            className="flex items-center justify-end gap-3 p-4 border border-gray-200 rounded-lg hover:border-gold hover:bg-gold/5 transition group md:col-start-2"
          >
            <div className="text-right">
              <div className="text-sm text-gray-600">Следующая статья</div>
              <div className="font-semibold text-dark group-hover:text-gold transition">
                {nextPost.title}
              </div>
            </div>
            <ChevronRight className="text-gold group-hover:translate-x-1 transition" size={20} />
          </a>
        ) : (
          <div></div>
        )}
      </nav>

      {/* Back to blog */}
      <div className="mt-12 text-center">
        <a
          href="/blog"
          className="inline-block px-6 py-3 bg-dark text-white hover:bg-gold hover:text-dark transition rounded-lg font-semibold"
        >
          ← Вернуться к блогу
        </a>
      </div>
    </article>
  );
}
