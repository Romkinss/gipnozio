import React from 'react';

const Solution: React.FC = () => {
  return (
    <div className="bg-dark-accent py-20 text-center text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h3 className="text-3xl md:text-4xl font-serif mb-6">Решение есть.</h3>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Комплексный профессиональный курс <span className="text-gold font-bold">GIPNOZIO Academy</span>. 
          Это не просто лекции, это система, которая превращает вас из новичка или уставшего специалиста в востребованного мастера работы с подсознанием.
        </p>
      </div>
    </div>
  );
};

export default Solution;