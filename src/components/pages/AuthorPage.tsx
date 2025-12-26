import React, { useEffect, useState } from 'react';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Article } from '../../types/index';
import PublicLayout from '../../PublicLayout';
import SEO from '../../SEO';
import { formatContent } from '../../utils/markdownFormatter';
import ShareButtons from '../../ShareButtons';
import Breadcrumbs from '../../Breadcrumbs';
import DOMPurify from 'dompurify';

const AuthorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [author, setAuthor] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We treat the author page as a special article. 
    // In seed data, we defined slug 'roman-tretiakov'
    if (slug) {
        api.articles.get(slug).then(data => {
            setAuthor(data || null);
            setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
      return (
        <PublicLayout>
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
            </div>
        </PublicLayout>
      );
  }

  if (!author) {
      return <Navigate href="/404" />;
  }

  const breadcrumbItems = [
      { label: 'Главная', path: '/' },
      { label: 'Академия', path: '/' },
      { label: author.title, path: `/author/${author.slug}` }
  ];

  // Specific Schema for Person/Author
  const authorSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Роман Третьяков",
      "jobTitle": "Гипнотерапевт, Клинический психолог",
      "image": author.featuredImage || "https://raw.githubusercontent.com/Romkinss/guessay/main/Roman_gipnozio.jpg",
      "url": window.location.href,
      "sameAs": [
          "https://t.me/Roman_Tretiakov",
          "https://gipnozio.ru"
      ],
      "worksFor": {
          "@type": "Organization",
          "name": "Eurasian Academy of Hypnosis"
      },
      "description": author.excerpt
  };

  // Configure Sanitizer
  const cleanContent = DOMPurify.sanitize(formatContent(author.content), {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'style']
  });

  return (
    <PublicLayout>
      <SEO 
        title={`${author.title} - Гипнотерапевт и основатель Академии`}
        description={author.excerpt}
        image={author.featuredImage}
        type="article"
        jsonLd={authorSchema}
        breadcrumbs={breadcrumbItems}
      />

      <div className="bg-white min-h-screen font-sans">
          {/* Breadcrumbs */}
          <div className="bg-gray-50 border-b border-gray-100">
              <div className="max-w-5xl mx-auto px-4 py-3">
                  <Breadcrumbs items={breadcrumbItems} />
              </div>
          </div>

          <div className="container mx-auto px-4 py-12 max-w-4xl">
              
              {/* Header / Intro */}
              <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">{author.title}</h1>
                  <p className="text-xl text-gray-500 font-light">{author.excerpt}</p>
              </div>

              {/* Main Content */}
              <div className="prose prose-lg prose-gold mx-auto text-gray-700 leading-relaxed article-content">
                  <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
              </div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
                  <ShareButtons title={author.title} url={window.location.href} />
              </div>
          </div>
      </div>
    </PublicLayout>
  );
};

export default AuthorPage;