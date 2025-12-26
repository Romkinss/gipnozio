import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Section, SectionTitle } from './Layout';

const problems = [
  "Чувствуете, что уперлись в финансовый и профессиональный потолок?",
  "Клиенты не получают устойчивых результатов и возвращаются с теми же проблемами?",
  "Ваши текущие инструменты требуют слишком много времени для изменений?",
  "Испытываете выгорание от того, что работаете больше, чем зарабатываете?"
];

const Problem: React.FC = () => {
  return (
    <Section id="problem" dark>
      <div className="max-w-4xl mx-auto">
        <SectionTitle subtitle="Знакомо ли вам это состояние?">Почему вы здесь?</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-red-50 hover:border-red-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertCircle className="text-red-400 w-5 h-5" />
              </div>
              <p className="text-dark-accent font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Problem;