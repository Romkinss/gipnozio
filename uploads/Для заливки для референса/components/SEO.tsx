import React, { useEffect } from 'react';

interface Breadcrumb {
  label: string;
  path: string;
}

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  keywords?: string;
  author?: string;
  publishedAt?: string;
  jsonLd?: Record<string, any>; // Prop for custom structured data
  noindex?: boolean; // Prevent indexing (e.g. for 404 page)
  breadcrumbs?: Breadcrumb[]; // For BreadcrumbList schema
  faq?: { question: string; answer: string }[]; // For FAQPage schema
  video?: { name: string; description: string; thumbnailUrl: string; uploadDate: string; contentUrl?: string; embedUrl?: string }; // For VideoObject
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "Профессиональное обучение гипнотерапии и коучингу. Международная сертификация.", 
  image, 
  url, 
  type = 'website',
  keywords = "гипноз, обучение гипнозу, гипнотерапия, психология, курсы, сертификация",
  author = "Роман Третьяков",
  publishedAt,
  jsonLd,
  noindex = false,
  breadcrumbs,
  faq,
  video
}) => {
  const siteUrl = 'https://gipnozio.ru';
  const defaultImage = 'https://raw.githubusercontent.com/Romkinss/guessay/main/logo-gipnozio.jpg';
  
  // Construct absolute URLs
  const cleanPath = url ? (url.startsWith('/') ? url.substring(1) : url) : '';
  const metaUrl = url ? (url.startsWith('http') ? url : `${siteUrl}/${cleanPath}`) : siteUrl;
  const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;
  
  // Format title
  const fullTitle = title.includes('Eurasian Academy') ? title : `${title} | Eurasian Academy of Hypnosis`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Helper function to update or create meta tags
    const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update Standard Meta
    if (noindex) {
        updateMeta('robots', 'noindex, nofollow');
    } else {
        updateMeta('robots', 'index, follow');
        updateMeta('description', description);
        updateMeta('keywords', keywords);
    }

    // 4. Update Open Graph
    updateMeta('og:title', fullTitle, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', metaImage, 'property');
    updateMeta('og:url', metaUrl, 'property');
    updateMeta('og:type', type, 'property');
    updateMeta('og:site_name', 'Eurasian Academy of Hypnosis', 'property');

    // 5. Update Twitter Cards
    updateMeta('twitter:card', 'summary_large_image', 'name');
    updateMeta('twitter:title', fullTitle, 'name');
    updateMeta('twitter:description', description, 'name');
    updateMeta('twitter:image', metaImage, 'name');

    // 6. Article specifics
    if (type === 'article' && !noindex) {
       if (publishedAt) updateMeta('article:published_time', publishedAt, 'property');
       updateMeta('article:author', author, 'property');
    }

    // 7. Canonical URL
    if (!noindex) {
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement('link');
            linkCanonical.setAttribute('rel', 'canonical');
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.setAttribute('href', metaUrl);
    }

    // 8. JSON-LD Structured Data
    if (!noindex) {
        const schemas: Record<string, any>[] = [];

        // Main Schema
        if (jsonLd) {
            schemas.push(jsonLd);
        } else {
            const mainSchema = type === 'article' 
            ? {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": title,
                "image": [metaImage],
                "datePublished": publishedAt,
                "dateModified": publishedAt,
                "author": [{
                    "@type": "Person",
                    "name": author,
                    "url": "https://gipnozio.ru/author/roman-tretiakov" // Updated author link
                }],
                "publisher": {
                    "@type": "Organization",
                    "name": "Eurasian Academy of Hypnosis",
                    "logo": {
                        "@type": "ImageObject",
                        "url": defaultImage
                    }
                },
                "description": description
            }
            : {
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                "name": "Eurasian Academy of Hypnosis",
                "url": siteUrl,
                "logo": defaultImage,
                "sameAs": [
                    "https://www.youtube.com/channel/UCgZN-nQK-LeX5S77cc36UxA",
                    "https://www.instagram.com/gipnozio/",
                    "http://t.me/gipnozio"
                ],
                "description": "Профессиональное обучение гипнотерапии."
            };
            schemas.push(mainSchema);
        }

        // Breadcrumbs Schema
        if (breadcrumbs && breadcrumbs.length > 0) {
            schemas.push({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs.map((crumb, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": crumb.label,
                    "item": crumb.path.startsWith('http') ? crumb.path : `${siteUrl}${crumb.path}`
                }))
            });
        }

        // FAQ Schema
        if (faq && faq.length > 0) {
            schemas.push({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faq.map(item => ({
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.answer
                    }
                }))
            });
        }

        // Video Schema
        if (video) {
            schemas.push({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": video.name,
                "description": video.description,
                "thumbnailUrl": video.thumbnailUrl,
                "uploadDate": video.uploadDate,
                "embedUrl": video.embedUrl,
                "contentUrl": video.contentUrl
            });
        }

        // Inject all schemas
        let scriptJsonLd = document.getElementById('seo-json-ld');
        if (!scriptJsonLd) {
            scriptJsonLd = document.createElement('script');
            scriptJsonLd.id = 'seo-json-ld';
            scriptJsonLd.setAttribute('type', 'application/ld+json');
            document.head.appendChild(scriptJsonLd);
        }
        // If multiple schemas, wrap in array or graph, but simpler to just put array
        scriptJsonLd.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
    }

  }, [fullTitle, description, metaImage, metaUrl, type, keywords, author, publishedAt, jsonLd, noindex, breadcrumbs, faq, video]);

  return null;
};

export default SEO;