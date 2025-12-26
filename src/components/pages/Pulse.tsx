import React, { useEffect, useState, useMemo } from 'react';
import { api } from '../../services/api';
import { Article } from '../../types/index';
import { format, isAfter } from 'date-fns';
import ru from 'date-fns/locale/ru';
import PublicLayout from '../../PublicLayout';
import SEO from '../../SEO';
import Breadcrumbs from '../../Breadcrumbs';
import { 
    Radio, Coffee, Mic, GraduationCap, Users, 
    Lightbulb, ArrowRight, Calendar, Clock, 
    Bell, ChevronRight, Zap, CheckCircle
} from 'lucide-react';

const MARKER_CONFIG = {
  live: { label: 'LIVE', color: 'bg-red-500', icon: <Radio size={14} className="animate-pulse" /> },
  ceremony: { label: 'CEREMONY', color: 'bg-[#D4AF37]', icon: <Coffee size={14} /> },
  podcast: { label: 'PODCAST', color: 'bg-blue-500', icon: <Mic size={14} /> },
  lesson: { label: 'NEW LESSON', color: 'bg-purple-500', icon: <GraduationCap size={14} /> },
  meetup: { label: 'MEETUP', color: 'bg-cyan-500', icon: <Users size={14} /> },
  case: { label: 'CASE STUDY', color: 'bg-magenta-500', icon: <Zap size={14} /> },
  insight: { label: 'INSIGHT', color: 'bg-amber-500', icon: <Lightbulb size={14} /> },
};

const Pulse: React.FC = () => {
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        setLoading(true);
        api.articles.listPulse(filter).then(data => {
            setNews(data);
            setLoading(false);
        });
    }, [filter]);

    const breadcrumbItems = [
        { label: 'Главная', path: '/' },
        { label: 'Пульс Академии', path: '/pulse' }
    ];

    const upcomingEvent = useMemo(() => {
        return news.find(item => item.event_date && isAfter(new Date(item.event_date), new Date()));
    }, [news]);

    const filterTabs = [
        { id: 'all', label: 'Все', icon: null },
        { id: 'live', label: 'Эфиры', icon: <Radio size={12} /> },
        { id: 'meetup', label: 'Встречи', icon: <Users size={12} /> },
        { id: 'insight', label: 'Инсайты', icon: <Lightbulb size={12} /> },
        { id: 'lesson', label: 'Уроки', icon: <GraduationCap size={12} /> },
    ];

    return (
        <PublicLayout>
            <SEO 
                title="Пульс Академии - Живая лента событий GIPNOZIO"
                description="Следите за жизнью Академии в режиме реального времени. Эфиры, встречи в Нови-Саде, новые уроки и инсайты от Романа Третьякова."
                url="/pulse"
                breadcrumbs={breadcrumbItems}
            />

            <div className="bg-light border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
            </div>

            <section className="py-12 md:py-20 bg-dark text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 blur-[120px] rounded-full"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Live Experience</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        Pulse <span className="text-gold">Academy</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Следите за жизнью сообщества: от онлайн эфиров и уроков до священных церемоний и ретритов в разных точках мира.
                    </p>
                </div>
            </section>

            <div className="sticky top-16 bg-white/95 backdrop-blur shadow-sm border-b border-gray-100 z-30 py-4">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 justify-center">
                        {filterTabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setFilter(tab.id)}
                                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${filter === tab.id ? 'bg-dark text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="py-12 bg-light min-h-screen">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-[1fr_320px] gap-12">
                        <div className="relative">
                            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gray-200 to-transparent"></div>

                            <div className="space-y-12">
                                {loading ? (
                                    <div className="flex flex-col items-center py-20 text-gray-400">
                                        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                                        <p className="text-xs font-bold uppercase tracking-widest">Синхронизация...</p>
                                    </div>
                                ) : news.length === 0 ? (
                                    <div className="text-center py-20">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                            <Calendar size={32} />
                                        </div>
                                        <h3 className="text-xl font-serif font-bold text-dark">Событий пока нет</h3>
                                    </div>
                                ) : (
                                    news.map((item, idx) => {
                                        const config = MARKER_CONFIG[item.marker_type || 'insight'];
                                        const isExternal = !!item.external_url;
                                        const isPast = item.event_date ? !isAfter(new Date(item.event_date), new Date()) : true;

                                        return (
                                            <div key={item.id} className="relative md:pl-24 group animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                                                <div className={`hidden md:flex absolute left-[25px] top-6 w-3 h-3 rounded-full z-10 border-2 border-white shadow-sm transition-transform group-hover:scale-150 ${config.color}`}></div>
                                                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-gold-hover hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest ${config.color} shadow-sm w-fit`}>
                                                            {config.icon} {config.label}
                                                        </div>
                                                        {item.event_date && (
                                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                                                <Calendar size={14} className="text-gold" />
                                                                {format(new Date(item.event_date), 'd MMMM yyyy', { locale: ru })}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
                                                        <div>
                                                            <h3 className="text-xl md:text-2xl font-serif font-bold text-dark mb-4 leading-tight group-hover:text-gold transition-colors">
                                                                {item.title}
                                                            </h3>
                                                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-light">
                                                                {item.excerpt}
                                                            </p>
                                                            <div className="flex flex-wrap gap-4">
                                                                {isExternal ? (
                                                                    <a href={item.external_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-dark text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-dark transition-all">Перейти к событию <ChevronRight size={16} /></a>
                                                                ) : (
                                                                    <a href={`/blog/${item.slug}`} className="inline-flex items-center gap-2 bg-gray-100 text-dark px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold transition-all">Подробнее <ChevronRight size={16} /></a>
                                                                )}
                                                                {isPast && !isExternal && (
                                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest"><CheckCircle size={14} className="text-green-500" /> Событие завершено</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {item.featuredImage && (
                                                            <div className="w-full md:w-48 aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-md shrink-0">
                                                                <img src={item.featuredImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        <aside className="hidden lg:block relative">
                            <div className="sticky top-40 space-y-8">
                                {upcomingEvent && (
                                    <div className="bg-white rounded-3xl p-6 border border-gold/30 shadow-lg shadow-gold/5 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
                                        <div className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><Radio size={12} className="animate-pulse" /> Ближайшее событие</div>
                                        <h4 className="font-serif font-bold text-lg text-dark mb-4 leading-tight">{upcomingEvent.title}</h4>
                                        <a href={upcomingEvent.external_url ? upcomingEvent.external_url : `/blog/${upcomingEvent.slug}`} className="block w-full py-3 bg-dark text-white rounded-xl text-xs font-bold uppercase tracking-widest text-center hover:bg-gold hover:text-dark transition-all">Участвовать</a>
                                    </div>
                                )}
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <h4 className="font-bold text-xs uppercase tracking-widest mb-4">Миссия Пульса</h4>
                                    <p className="text-xs text-gray-400 leading-relaxed italic">
                                        "Мы создаем живое пространство, где теория гипноза встречается с реальной жизнью. Каждый пост — это шаг к большей осознанности."
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
};

export default Pulse;