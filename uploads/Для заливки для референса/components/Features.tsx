import React from 'react';
import { BookOpen, Users, Award, Zap, Globe, Shield } from 'lucide-react';
import { Section, SectionTitle } from './Layout';

const FEATURES = [
  {
    icon: <Globe className="w-8 h-8 text-gold" />,
    title: 'Международные стандарты',
    description: 'Программа соответствует стандартам National Guild of Hypnotists (США). Диплом признается во всем мире.'
  },
  {
    icon: <Zap className="w-8 h-8 text-gold" />,
    title: 'Практика с 1-го занятия',
    description: 'Мы не учим сухой теории. Вы начнете погружать в транс и проводить индукции уже на первой неделе.'
  },
  {
    icon: <Users className="w-8 h-8 text-gold" />,
    title: 'Супервизия и поддержка',
    description: 'Личный куратор, закрытый чат для отработки техник и еженедельные разборы сессий с Романом.'
  },
  {
    icon: <Award className="w-8 h-8 text-gold" />,
    title: 'Официальный диплом',
    description: 'Выдаем диплом установленного образца с занесением в ФИС ФРДО (для РФ) и международный сертификат.'
  },
  {
    icon: <BookOpen className="w-8 h-8 text-gold" />,
    title: 'База знаний навсегда',
    description: 'Доступ к урокам, скриптам, протоколам и обновлениям курса сохраняется у вас бессрочно.'
  },
  {
    icon: <Shield className="w-8 h-8 text-gold" />,
    title: 'Безопасные методы',
    description: 'Экологичные техники, которые не могут навредить клиенту. Полное понимание физиологии мозга.'
  }
];

const Features: React.FC = () => {
  return (
    <Section id="features">
      <SectionTitle subtitle="Почему выбирают нас">Преимущества обучения</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-gold/20 hover:border-gold/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500"></div>
            
            <div className="relative z-10">
                <div className="w-14 h-14 bg-dark rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-gold/10 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-gold-dark transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
                </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Features;