
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Play, FileText, HelpCircle, CheckCircle, Monitor } from 'lucide-react';

const LMS_PREVIEW_ITEMS = [
  { id: 1, title: 'Модель сознания', type: 'video', duration: '15 мин' },
  { id: 2, title: 'Что такое гипноз?', type: 'video', duration: '22 мин' },
  { id: 3, title: 'Тест: Основы транса', type: 'quiz', duration: '5 вопр.' },
  { id: 4, title: 'Гайд по практике', type: 'pdf', duration: '12 стр.' }
];

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="cta" className="py-20 md:py-28 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-dark/20 via-dark to-dark"></div>
      
      {/* Decorative pulse element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/5 rounded-full animate-ping pointer-events-none"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full mb-8">
            <Monitor size={14} className="text-gold" />
            <span className="text-[10px] font-bold text-gold uppercase tracking-widest">100% Online Experience</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Начните карьеру онлайн-мастера</h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Получите доступ к первому модулю бесплатно и убедитесь, что онлайн-гипноз — это мощнейший инструмент XXI века.
        </p>

        {/* Video Embed */}
        <div className="w-full max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gold/20 relative group">
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
            <div className="video-container">
                <iframe 
                    src="https://kinescope.io/embed/fEyBgTT3EPhmSCNKu1kEu7" 
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" 
                    frameBorder="0" 
                    allowFullScreen 
                ></iframe>
            </div>
        </div>

        {/* LMS PREVIEW BLOCK */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up">
            <div className="flex flex-col items-center mb-8">
                <div className="h-px w-20 bg-gold/30 mb-6"></div>
                <h3 className="text-gold text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4">
                    Содержимое бесплатного демо-доступа
                </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {LMS_PREVIEW_ITEMS.map((item) => (
                    <div 
                        key={item.id}
                        className="group bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl flex flex-col items-center text-center hover:border-gold/50 transition-all duration-500 relative overflow-hidden"
                    >
                        {/* Status Icon */}
                        <div className="absolute top-2 right-2 text-gold/40 group-hover:text-gold transition-colors">
                            <Lock size={12} />
                        </div>
                        
                        {/* Type Icon */}
                        <div className="w-10 h-10 bg-dark-accent rounded-full flex items-center justify-center mb-3 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                            {item.type === 'video' && <Play size={16} className="text-blue-400 ml-0.5" />}
                            {item.type === 'quiz' && <HelpCircle size={16} className="text-emerald-400" />}
                            {item.type === 'pdf' && <FileText size={16} className="text-orange-400" />}
                        </div>
                        
                        <h4 className="text-white text-[11px] md:text-xs font-bold leading-tight mb-1 group-hover:text-gold transition-colors">
                            {item.title}
                        </h4>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                            {item.duration}
                        </span>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-[10px] md:text-xs uppercase tracking-widest font-bold">
                <CheckCircle size={14} className="text-gold" />
                Личный кабинет откроется сразу после авторизации
            </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative group w-full max-w-md">
            <div className="absolute -inset-1 bg-gold rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-1000"></div>
            <button 
                onClick={() => navigate('/login')}
                className="relative px-12 py-6 bg-gold hover:bg-white hover:text-dark text-dark-accent font-bold text-xl rounded-lg shadow-[0_0_30px_rgba(197,160,70,0.5)] transform hover:scale-[1.02] transition-all duration-300 w-full uppercase tracking-wide"
            >
                Начать обучение
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-3 font-light">Ваш путь к международной карьере начинается здесь.</p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
