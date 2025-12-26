import React from 'react';
import { SectionTitle, Section } from './Layout';

const stats = [
  { value: '100+', label: 'ЧАСОВ ОБУЧЕНИЯ' },
  { value: '250+', label: 'УЧЕНИКОВ' },
  { value: '10+', label: 'ЛЕТ ПРАКТИКИ' },
  { value: '100%', label: 'ONLINE ОБУЧЕНИЕ' },
];

const TEAM = [
  {
    id: 1,
    name: 'Роман Третьяков',
    role: 'ГИПНОТЕРАПЕВТ, КОУЧ',
    bio: 'Роман — сертифицированный гипнотерапевт с более чем 10-летним опытом. Специализируется на лечении фобий и тревожности. Владеет техниками эриксоновского гипноза и современными NLP-методологиями.',
    image: 'https://raw.githubusercontent.com/Romkinss/guessay/main/Roman_gipnozio.jpg'
  },
  {
    id: 2,
    name: 'Ирина Третьякова',
    role: 'ЙОГА, ДЖОТИШ, ПСИХОЛОГ',
    bio: 'Ирина — профессиональный психолог и преподаватель йоги. Сочетает восточную мудрость с западным психологическим подходом. Специалист в области эмоциональной интеграции.',
    image: 'https://raw.githubusercontent.com/Romkinss/guessay/main/Irina_gipnozio.jpg'
  },
  {
    id: 3,
    name: 'Алан Агабалаев',
    role: 'ГИПНОТЕРАПЕВТ, НУТРИЦИОЛОГ',
    bio: 'Алан — многопрофильный специалист в области холистического здоровья. Объединяет гипнотерапевтические техники с нутрициональной поддержкой и энергетическими практиками.',
    image: 'https://raw.githubusercontent.com/Romkinss/guessay/main/Alan_gipnozio.jpg'
  }
];

const Stats: React.FC = () => {
  return (
    <Section id="about">
      <SectionTitle>Наши достижения в цифрах</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center p-6 bg-white border border-gold/20 rounded-lg shadow-gold hover:-translate-y-1 transition-transform">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2">{stat.value}</div>
            <div className="text-xs md:text-sm uppercase tracking-wide text-gray-500 font-semibold">{stat.label}</div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-serif font-bold text-center mb-8">Команда преподавателей</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {TEAM.map((member) => (
          <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 group">
            <div className="h-64 overflow-hidden relative">
               <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10"></div>
               <img src={member.image} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-dark mb-1">{member.name}</h4>
              <p className="text-gold text-sm font-semibold uppercase mb-4">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Stats;