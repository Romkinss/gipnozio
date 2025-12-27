import React from 'react';
import { Clock } from 'lucide-react';

const Scarcity: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-dark to-dark-accent py-12 border-y border-gold/30">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-200 px-4 py-2 rounded-full mb-6 border border-red-500/30">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Количество мест ограничено</span>
        </div>
        <h2 className="text-2xl md:text-3xl text-white font-serif mb-4">Набор группы закрывается через 3 дня</h2>
        <p className="text-gray-400 mb-0">Мы берем только 20 человек на поток для качественной супервизии.</p>
      </div>
    </div>
  );
};

export default Scarcity;