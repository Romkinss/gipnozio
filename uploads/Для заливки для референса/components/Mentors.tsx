import React from 'react';

const TEAM = [
  {
    id: 1,
    name: 'Роман Третьяков',
    role: 'ГИПНОТЕРАПЕВТ, КОУЧ',
    bio: 'Роман — сертифицированный гипнотерапевт с более чем 10-летним опытом. Специализируется на лечении фобий и тревожности. Владеет техниками эриксоновского гипноза и современными NLP-методологиями.',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    name: 'Ирина Третьякова',
    role: 'ЙОГА, ДЖОТИШ, ПСИХОЛОГ',
    bio: 'Ирина — профессиональный психолог и преподаватель йоги. Сочетает восточную мудрость с западным психологическим подходом. Специалист в области эмоциональной интеграции.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    name: 'Алан Агабалаев',
    role: 'ГИПНОТЕРАПЕВТ, НУТРИЦИОЛОГ',
    bio: 'Алан — многопрофильный специалист в области холистического здоровья. Объединяет гипнотерапевтические техники с нутрициональной поддержкой и энергетическими практиками.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  }
];

const Mentors: React.FC = () => {
  return (
    <section id="mentors" className="pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-dark">Команда преподавателей</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {TEAM.map((member) => (
            <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 group">
              <div className="h-72 overflow-hidden relative">
                 <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                 <img src={member.image} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
              </div>
              <div className="p-8">
                <h4 className="text-xl font-bold text-dark mb-2">{member.name}</h4>
                <p className="text-gold text-xs font-bold uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;