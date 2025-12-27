
import React from 'react';
import { Check, X } from 'lucide-react';
import { Section, SectionTitle } from './Layout';
import { useNavigate } from 'react-router-dom';

const PLANS = [
  {
    name: 'Слушатель',
    price: '45 000 ₽',
    description: 'Для тех, кто хочет разобраться в себе и основах гипноза.',
    features: [
      'Доступ ко всем видео-урокам (6 месяцев)',
      'Конспекты и методички',
      'Общий чат студентов',
      'Самостоятельная отработка',
      'Электронный сертификат участия'
    ],
    missing: [
        'Проверка домашних заданий',
        'Супервизии с преподавателем',
        'Диплом о переподготовке',
        'Помощь в продвижении'
    ],
    highlight: false,
    cta: 'Выбрать базовый'
  },
  {
    name: 'Специалист',
    price: '95 000 ₽',
    description: 'Полная профессиональная подготовка с выдачей диплома.',
    features: [
      'Доступ ко всем материалам навсегда',
      'Проверка всех домашних заданий',
      'Практика в тройках с куратором',
      '12 групповых супервизий',
      'Официальный Диплом',
      'Модуль "Продвижение и продажи"'
    ],
    missing: [
        'Личное наставничество Романа',
        'Разбор вашего кейса'
    ],
    highlight: true,
    cta: 'Стать профи'
  },
  {
    name: 'VIP Менторство',
    price: '250 000 ₽',
    description: 'Личная работа с Романом Третьяковым до результата.',
    features: [
      'Всё, что в тарифе Специалист',
      'Личное наставничество (3 месяца)',
      'Индивидуальная проработка ваших блоков',
      'Совместное ведение первого клиента',
      'Доступ в закрытый клуб выпускников',
      'Приоритетная поддержка 24/7'
    ],
    missing: [],
    highlight: false,
    cta: 'Начать VIP'
  }
];

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Section id="pricing">
      <SectionTitle subtitle="Выберите формат обучения">Стоимость курсов</SectionTitle>
      <div className="grid md:grid-cols-3 gap-8">
        {PLANS.map((plan, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
              plan.highlight 
                ? 'bg-dark text-white border-gold shadow-2xl scale-105 z-10' 
                : 'bg-white text-dark border-gray-100 hover:border-gold/30'
            }`}
          >
            <h3 className={`text-2xl font-serif font-bold mb-2 ${plan.highlight ? 'text-gold' : 'text-dark'}`}>{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
            </div>
            <p className={`text-sm mb-8 ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>{plan.description}</p>
            
            <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                        <Check className="w-5 h-5 text-gold shrink-0" />
                        <span>{feature}</span>
                    </div>
                ))}
                {plan.missing.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm opacity-30">
                        <X className="w-5 h-5 shrink-0" />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>

            <button 
                onClick={() => navigate('/login')}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                    plan.highlight 
                        ? 'bg-gold text-dark hover:bg-white' 
                        : 'bg-gray-100 text-dark hover:bg-gold hover:text-white'
                }`}
            >
                {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Pricing;
