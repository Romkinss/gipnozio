import React, { useEffect } from 'react';
import PublicLayout from '../../PublicLayout';
import SEO from '../../SEO';
import { Sparkles, ArrowRight, CheckCircle2, Waves, Compass, Crown, Shield, Zap, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

const OfferPage: React.FC = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PublicLayout>
      <SEO 
        title="Специальное предложение - GIPNOZIO Academy" 
        description="Станьте архитектором состояний. Эксклюзивный доступ к методикам онлайн-гипноза."
        url="/offer"
      />

      <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-gold/30">
        
        {/* HERO: THE ARCHITECT OF STATES */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden pt-20">
          {/* Animated Background Orbs */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gold/10 rounded-full blur-[160px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[140px]"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }}></div>

          <div className="container mx-auto max-w-5xl relative z-10 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-10 backdrop-blur-md animate-fade-in-up">
              <Crown size={14} className="text-gold" />
              <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">Limited Admission • Intake #5</span>
            </div>

            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-serif font-bold mb-10 leading-[0.95] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Ваше <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark italic">Новое</span> <br />
              Мастерство
            </h1>

            <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-16 font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Фундаментальный вход в профессию онлайн-гипнотерапевта. <br />
              Инструменты, которые меняют жизнь через глубину подсознания.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <button 
                onClick={() => window.location.href = '/login'}
                className="group px-12 py-6 bg-gold hover:bg-white hover:text-dark text-dark font-bold rounded-2xl transition-all shadow-[0_20px_50px_rgba(212,175,55,0.2)] hover:shadow-white/20 uppercase tracking-widest text-sm transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4"
              >
                Начать обучение <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* PILLARS: FROSTED GLASS CARDS */}
        <section className="py-32 px-4 border-y border-white/5 relative bg-[#080808]">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <Waves className="text-gold" />, 
                  title: "Глубинная Регрессия", 
                  desc: "Мы не лечим симптомы. Мы удаляем корень проблемы на уровне нейронных связей." 
                },
                { 
                  icon: <Compass className="text-gold" />, 
                  title: "Цифровой Раппорт", 
                  desc: "Авторская методика входа в глубокий транс через аудио-канал, работающая в любой точке мира." 
                },
                { 
                  icon: <Target className="text-gold" />, 
                  title: "Личный Бренд", 
                  desc: "Стратегия превращения навыка в элитный бизнес с чеком от 15 000 ₽ за одну сессию." 
                }
              ].map((item, i) => (
                <div key={i} className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-gold/30 transition-all duration-700 group relative">
                  <div className="w-14 h-14 bg-dark rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:rotate-[360deg] transition-all duration-1000">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESULTS: THE PROMISE */}
        <section className="py-40 px-4 bg-white text-dark">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-24">
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gold/10 -m-6 rounded-[4rem] transform -rotate-3"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80" 
                    className="relative rounded-[3.5rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 object-cover aspect-square" 
                    alt="Immersion"
                  />
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 space-y-12 text-left">
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight">Результат, <br />который <span className="text-gold italic">ощутим</span></h2>
                  <p className="text-xl text-gray-500 font-light">Это не просто теория. Это передача прямого опыта от мастера к ученику.</p>
                </div>
                
                <div className="space-y-6">
                  {[
                    "Освоение 12 протоколов работы с подсознанием",
                    "Навык мгновенной индукции через Zoom/Skype",
                    "Избавление от личных блоков и страхов",
                    "Международный диплом GIPNOZIO Academy"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors">
                        <CheckCircle2 size={16} className="text-gold group-hover:text-white" />
                      </div>
                      <span className="text-lg font-medium text-dark-accent">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => window.location.href = '/login'}
                    className="flex items-center gap-3 text-gold font-bold uppercase tracking-widest text-sm hover:text-dark transition-all group"
                  >
                    Занять место в группе <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER: THE CALL */}
        <section className="py-40 bg-[#050505] text-center px-4 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]"></div>
          
          <div className="container mx-auto max-w-4xl relative z-10">
            <h2 className="text-5xl md:text-8xl font-serif font-bold mb-10">Готовы <br /><span className="text-gold italic">пробудиться?</span></h2>
            <p className="text-xl text-gray-400 font-light mb-16 italic">«Ваше подсознание знает ответ. Мы просто научим его слышать».</p>
            
            <button 
              onClick={() => window.location.href = '/login'}
              className="px-16 py-8 bg-white text-dark hover:bg-gold hover:text-white font-bold text-xl rounded-[2rem] transition-all shadow-2xl hover:scale-105 active:scale-95 uppercase tracking-widest"
            >
              Войти в Академию
            </button>
            
            <div className="mt-20 flex justify-center gap-12 opacity-30">
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Shield size={14} /> Security</div>
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Zap size={14} /> Quality</div>
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Sparkles size={14} /> Magic</div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default OfferPage;