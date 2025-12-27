import React, { useEffect, useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { api } from '../services/api';
import { Testimonial } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { Video, Image as ImageIcon, PlayCircle, Star } from 'lucide-react';

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState<'all' | 'video' | 'image'>('all');
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    api.testimonials.list(filter).then(setTestimonials);
  }, [filter]);

  const getVideoEmbedUrl = (url?: string) => {
    if (!url) return '';
    if (url.includes('kinescope.io')) {
      const id = url.split('/').pop();
      return `https://kinescope.io/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const getThumbnailUrl = (item: Testimonial) => {
    if (item.thumbnailUrl) return item.thumbnailUrl;
    if (item.type === 'video' && item.mediaUrl?.includes('kinescope.io')) {
        const id = item.mediaUrl.split('/').pop();
        return `https://kinescope.io/${id}/poster`;
    }
    return item.mediaUrl || '';
  };

  const breadcrumbItems = [
      { label: 'Главная', path: '/' },
      { label: 'Отзывы', path: '/testimonials' }
  ];

  return (
    <PublicLayout>
      <SEO 
        title="Отзывы учеников и клиентов - Eurasian Academy of Hypnosis" 
        description="Реальные истории трансформации и видеоотзывы выпускников академии гипноза Романа Третьякова."
        url="/testimonials"
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
            Отзывы <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-dark to-gold">клиентов</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600">
            Реальные истории трансформации от людей, которые прошли путь к внутренней гармонии
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Filters */}
          <div className="flex justify-center mb-12">
            <div className="p-1 flex bg-gray-100 rounded-full">
               <button 
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${filter === 'all' ? 'bg-gold text-white shadow-md' : 'text-gray-500 hover:text-dark'}`}
               >
                   Все отзывы
               </button>
               <button 
                onClick={() => setFilter('video')}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${filter === 'video' ? 'bg-gold text-white shadow-md' : 'text-gray-500 hover:text-dark'}`}
               >
                   <Video size={16} /> Видео
               </button>
               <button 
                onClick={() => setFilter('image')}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${filter === 'image' ? 'bg-gold text-white shadow-md' : 'text-gray-500 hover:text-dark'}`}
               >
                   <ImageIcon size={16} /> Фото
               </button>
            </div>
          </div>

          {/* Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
             {testimonials.map(item => (
                 <div key={item.id} className="break-inside-avoid bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-gold transition-all duration-300 p-4 mb-8">
                     <div className="rounded-lg overflow-hidden mb-4 bg-gray-100 relative">
                        {item.type === 'video' ? (
                            <div style={{ aspectRatio: '16/9' }} className="relative bg-black">
                                {playingVideos[item.id] ? (
                                    <iframe 
                                        src={getVideoEmbedUrl(item.mediaUrl)} 
                                        className="w-full h-full absolute inset-0" 
                                        allow="autoplay; fullscreen" 
                                        frameBorder="0"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div 
                                        className="w-full h-full cursor-pointer group relative"
                                        onClick={() => setPlayingVideos({...playingVideos, [item.id]: true})}
                                    >
                                        <img 
                                            src={getThumbnailUrl(item)} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                            <PlayCircle className="text-white opacity-90 group-hover:scale-110 transition-transform" size={60} />
                                        </div>
                                        <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur flex items-center gap-1">
                                            <Video size={10} /> ВИДЕО
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="relative">
                                <img src={item.mediaUrl} alt={item.name} className="w-full h-auto object-cover" />
                                <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur flex items-center gap-1">
                                    <ImageIcon size={10} /> ФОТО
                                </div>
                            </div>
                        )}
                     </div>

                     <div className="text-center px-2 pb-2">
                        <h3 className="font-bold text-dark text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">{item.age ? `${item.age} лет, ` : ''}{item.profession}</p>
                        <div className="mb-3 text-gold flex justify-center gap-0.5">
                            {[...Array(item.rating)].map((_, i) => <Star key={i} size={14} fill="#D4AF37" />)}
                        </div>
                        <p className="italic text-gray-600 font-serif leading-relaxed">"{item.content}"</p>
                     </div>
                 </div>
             ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TestimonialsPage;