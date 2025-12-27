
import React from 'react';
import { DollarSign, Globe, Clock, Coffee, Sparkles } from 'lucide-react';
import { Section, SectionTitle } from './Layout';

const BENEFITS = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Нулевые издержки",
    text: "Никакой аренды кабинета, налогов на недвижимость или расходов на логистику."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Весь мир — ваш рынок",
    text: "Ваша аудитория не ограничена вашим районом. Работайте с русскоговорящими по всему миру."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Свободный график",
    text: "Сами решайте, когда работать. Гипноз онлайн позволяет легко совмещать практику с жизнью."
  }
];

const GlobalCareer: React.FC = () => {
  return (
    <Section id="career" dark className="bg-dark text-white overflow-hidden">
      <SectionTitle subtitle="Карьера нового времени">Ваша жизнь после обучения</SectionTitle>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Benefits */}
        <div className="lg:col-span-2 grid md:grid-cols-3 gap-6">
          {BENEFITS.map((b, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-gold/50 transition-all group">
              <div className="w-12 h-12 bg-gold/20 text-gold rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {b.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{b.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{b.text}</p>
            </div>
          ))}
          
          <div className="md:col-span-3 bg-gradient-to-r from-gold/20 to-transparent p-10 rounded-3xl border border-gold/30">
             <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h4 className="text-2xl font-serif font-bold text-gold mb-4">Средний доход выпускника</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Стоимость одной онлайн-сессии варьируется от 5 000 до 15 000 рублей. 
                    При 10 клиентах в месяц ваша практика приносит доход, превышающий среднюю зарплату топ-менеджера.
                  </p>
                  <div className="flex gap-4">
                    <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/5">
                      <span className="block text-xs text-gray-400">Старт</span>
                      <span className="text-xl font-bold">~100к / мес</span>
                    </div>
                    <div className="bg-gold/10 px-4 py-2 rounded-lg border border-gold/20">
                      <span className="block text-xs text-gold">Профи</span>
                      <span className="text-xl font-bold text-gold">300к+ / мес</span>
                    </div>
                  </div>
                </div>
                <div className="w-48 h-48 bg-dark rounded-full border-4 border-gold/30 flex items-center justify-center relative">
                    <Sparkles className="text-gold absolute -top-4 -right-4 animate-bounce" />
                    <div className="text-center">
                      <span className="text-4xl font-bold text-gold">x5</span>
                      <span className="block text-[10px] uppercase tracking-widest text-gray-400">Окупаемость</span>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Lifestyle */}
        <div className="bg-white rounded-3xl p-8 text-dark relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Coffee size={120} />
          </div>
          <h4 className="text-2xl font-serif font-bold mb-6">Lifestyle Мастера</h4>
          <ul className="space-y-6 relative z-10">
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-1">✓</div>
              <p className="text-sm">Проснулись в горах, провели 2 сессии, пошли гулять.</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-1">✓</div>
              <p className="text-sm">Никаких пробок и утренних совещаний.</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-1">✓</div>
              <p className="text-sm">Ваш офис — это чашка кофе и ноутбук.</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-1">✓</div>
              <p className="text-sm">Вы помогаете людям менять жизни, даже не выходя из дома.</p>
            </li>
          </ul>
          
          <div className="mt-12 bg-dark text-white p-6 rounded-2xl transform group-hover:scale-105 transition-transform">
            <p className="text-xs italic">"Я переехала в Сербию, и мой бизнес переехал со мной за 1 день. Клиенты даже не заметили разницы, а качество моей жизни выросло вдвое."</p>
            <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-gold">— Ирина, выпускница 3 потока</div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default GlobalCareer;
