
import React, { useEffect, useState } from 'react';

import { api } from '../services/api';
import { Article } from '../types/index';
import { Play, Radio, Coffee, Mic, GraduationCap, Users, Lightbulb, ArrowRight, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

const MARKER_CONFIG = {
  live: { label: 'LIVE', color: 'bg-red-500', icon: <Radio size={12} className="animate-pulse" /> },
  ceremony: { label: 'CEREMONY', color: 'bg-[#D4AF37]', icon: <Coffee size={12} /> },
  podcast: { label: 'PODCAST', color: 'bg-blue-500', icon: <Mic size={12} /> },
  lesson: { label: 'NEW LESSON', color: 'bg-purple-500', icon: <GraduationCap size={12} /> },
  meetup: { label: 'MEETUP', color: 'bg-cyan-500', icon: <Users size={12} /> },
  case: { label: 'CASE STUDY', color: 'bg-magenta-500', icon: <Play size={12} /> },
  insight: { label: 'INSIGHT', color: 'bg-amber-500', icon: <Lightbulb size={12} /> },
};

const AcademyPulse: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fix: listNews is now correctly typed in api service
        const data = await api.articles.listNews(6);
        setNews(data);
      } catch (e) {
        console.error('Pulse fetch error', e);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading || news.length === 0) return null;

  return (
    <section className="py-12 bg-light border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-dark uppercase tracking-widest">Pulse Academy</h2>
            </div>
            {/* ✅ ПРАВКА: Ссылка ведет на /pulse */}
            <a href="/pulse" className="text-xs font-bold text-gold hover:text-gold-dark uppercase tracking-widest flex items-center gap-2 transition-colors">
                Все события <ArrowRight size={14} />
            </a>
        </div>

        {/* Horizontal Scroll for Mobile, Grid for Desktop */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 no-scrollbar pb-4 md:pb-0">
          {news.map((item) => {
            const config = MARKER_CONFIG[item.marker_type || 'insight'];
            const isExternal = !!item.external_url;
            
            // Fix: Refactor CardWrapper logic to avoid key prop issues and improve performance
            const innerContent = (
              <div className="h-full bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm group-hover:shadow-gold-hover group-hover:-translate-y-1 transition-all duration-500 flex flex-col relative overflow-hidden">
                  {/* Glass Effect Background Accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 ${config.color} opacity-[0.03] rounded-bl-full -mr-4 -mt-4 group-hover:scale-150 transition-transform duration-700`}></div>

                  {/* Badge */}
                  <div className="flex justify-between items-start mb-4">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest ${config.color} shadow-sm`}>
                          {config.icon} {config.label}
                      </div>
                      {item.event_date && (
                          <div className="text-gray-400 flex flex-col items-end">
                              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tighter">
                                  <Calendar size={10} className="text-gold" /> {format(new Date(item.event_date), 'd MMM', { locale: ru })}
                              </div>
                              {item.event_time && (
                                  <div className="flex items-center gap-1.5 text-[9px] font-medium text-gray-300">
                                      <Clock size={10} /> {item.event_time}
                                  </div>
                              )}
                          </div>
                      )}
                  </div>

                  <h3 className="text-lg font-bold text-dark mb-3 leading-tight group-hover:text-gold transition-colors line-clamp-2">
                      {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 mb-6 font-light leading-relaxed">
                      {item.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          {isExternal ? 'Перейти в Бот' : 'Читать далее'}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gold group-hover:text-white transition-all">
                          <ArrowRight size={14} />
                      </div>
                  </div>
              </div>
            );

            return isExternal ? (
              <a 
                key={item.id} 
                href={item.external_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block min-w-[280px] md:min-w-0 group"
              >
                {innerContent}
              </a>
            ) : (
              <a 
                key={item.id} 
                href={`/blog/${item.slug}`} 
                className="block min-w-[280px] md:min-w-0 group"
              >
                {innerContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AcademyPulse;
