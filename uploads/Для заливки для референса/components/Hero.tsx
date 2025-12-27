
import React from 'react';

const Hero: React.FC = () => {
  const scrollToCTA = () => {
    const element = document.getElementById('cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProgram = () => {
    const element = document.getElementById('curriculum');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="bg-[#0F0F0F] text-white py-24 md:py-40 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px]"></div>
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        
        {/* Badge with glassmorphism */}
        <div className="inline-block px-6 py-2 border border-gold/30 rounded-full mb-10 bg-gold/5 backdrop-blur-sm animate-fade-in-up">
          <span className="text-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
            Digital-профессия будущего
          </span>
        </div>

        {/* ✅ ПРАВКА: text-4xl на мобилках вместо 5xl для предотвращения переполнения */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold mb-10 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Станьте <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark">ОНЛАЙН</span> <br />
          Гипнотерапевтом
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-14 leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Фундаментальное обучение искусству работы с подсознанием через Zoom и Skype. 
          Помогайте людям из любой точки мира, живя там, где вам нравится.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <button 
            onClick={scrollToCTA}
            className="px-12 py-5 bg-gold hover:bg-white hover:text-dark text-dark font-bold rounded-xl transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-white/20 uppercase tracking-widest text-sm md:text-base w-full sm:w-auto transform hover:-translate-y-1 active:scale-95"
          >
            Начать практику
          </button>
          <button 
            onClick={scrollToProgram}
            className="px-12 py-5 border border-white/10 text-white hover:bg-white/5 backdrop-blur-sm font-bold rounded-xl transition-all uppercase tracking-widest text-sm md:text-base w-full sm:w-auto"
          >
            Узнать о карьере
          </button>
        </div>

        {/* Floating statistics for trust */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-50 grayscale hover:grayscale-0 transition-all duration-700 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div>
            <div className="text-2xl font-bold text-gold">100%</div>
            <div className="text-[10px] uppercase tracking-widest">Онлайн формат</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gold">🌍 24/7</div>
            <div className="text-[10px] uppercase tracking-widest">Доступ из мира</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gold">🚀 6 мес</div>
            <div className="text-[10px] uppercase tracking-widest">До первых денег</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gold">💎 ROI</div>
            <div className="text-[10px] uppercase tracking-widest">Окупаемость x5</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
