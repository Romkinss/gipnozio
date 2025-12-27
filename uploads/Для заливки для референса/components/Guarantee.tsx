import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Section } from './Layout';

const Guarantee: React.FC = () => {
  return (
    <Section className="bg-light-secondary text-center">
      <div className="max-w-2xl mx-auto border-2 border-dashed border-gold/30 p-10 rounded-2xl bg-gold/5">
        <ShieldCheck className="w-16 h-16 text-gold mx-auto mb-6" />
        <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif text-dark">100% Гарантия возврата</h3>
        <p className="text-gray-700 leading-relaxed text-lg">
          Мы уверены в качестве нашей программы. Если в течение первых 14 дней вы поймете, 
          что этот курс вам не подходит — мы вернем полную стоимость обучения без лишних вопросов.
        </p>
      </div>
    </Section>
  );
};

export default Guarantee;