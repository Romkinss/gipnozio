import React from 'react';
import { Target, BookOpen, Award } from 'lucide-react';
import { Section, SectionTitle } from './Layout';

const AUDIENCE_CARDS = [
  {
    icon: <Target className="w-8 h-8 text-gold" />,
    title: 'Для тех, кто устал от советов',
    description: 'Если вы ищете не просто разговоры, а реальные результаты. Этот курс научит вас глубокой работе с подсознанием.'
  },
  {
    icon: <BookOpen className="w-8 h-8 text-gold" />,
    title: 'Для специалистов',
    description: 'Идеально подходит для психологов, коучей, тарологов. Расширьте свой инструментарий и научитесь интегрировать гипнотерапию.'
  },
  {
    icon: <Award className="w-8 h-8 text-gold" />,
    title: 'Для новой профессии',
    description: 'Полная профессиональная подготовка от основ до практики. Получите знания для работы с клиентами и развития бизнеса.'
  }
];

const ForWhom: React.FC = () => {
  return (
    <Section id="audience" dark>
      <SectionTitle subtitle="Для кого разработан этот курс">Раскройте свой потенциал</SectionTitle>
      <div className="grid md:grid-cols-3 gap-8">
        {AUDIENCE_CARDS.map((card, index) => (
          <div key={index} className="bg-white p-8 rounded-xl shadow-md border-l-4 border-gold hover:shadow-gold transition-all duration-300">
            <div className="mb-6 bg-gold/5 w-16 h-16 rounded-full flex items-center justify-center">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-dark">{card.title}</h3>
            <p className="text-gray-600 leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ForWhom;