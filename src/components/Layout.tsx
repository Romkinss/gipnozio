import React from 'react';

export const Section: React.FC<{ 
  id?: string; 
  className?: string; 
  children: React.ReactNode; 
  dark?: boolean;
}> = ({ id, className = "", children, dark = false }) => {
  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 px-4 ${dark ? 'bg-light' : 'bg-light-secondary'} ${className}`}
    >
      <div className="max-w-6xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
};

export const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string }> = ({ children, subtitle }) => (
  <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
    {subtitle && (
      /* ✅ ПРАВКА: Существенное увеличение размера (text-lg md:text-xl) для солидности заголовка */
      <span className="block text-gold font-bold tracking-[0.2em] uppercase text-lg md:text-xl mb-4">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark relative inline-block pb-6 mb-4">
      {children}
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-gold to-gold-light rounded-full"></span>
    </h2>
  </div>
);