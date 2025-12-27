
import React from 'react';
import { Headphones, ShieldCheck, MapPinOff, Zap } from 'lucide-react';
import { Section, SectionTitle } from './Layout';

const MANIFESTO_ITEMS = [
  {
    icon: <Headphones className="w-8 h-8 text-gold" />,
    title: "Идеальная акустика",
    description: "В наушниках голос терапевта звучит прямо 'в голове' клиента, создавая эффект присутствия, недоступный в кабинете."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-gold" />,
    title: "Безопасность дома",
    description: "Клиент находится в своей привычной обстановке. Уровень доверия и расслабления на 40% выше, чем в чужом месте."
  },
  {
    icon: <MapPinOff className="w-8 h-8 text-gold" />,
    title: "Стирание границ",
    description: "Вам не нужно тратить время на дорогу. Вы можете проводить сессии для людей из Москвы, Белграда или Нью-Йорка."
  },
  {
    icon: <Zap className="w-8 h-8 text-gold" />,
    title: "Технологичность",
    description: "Современные платформы позволяют записывать сессии для анализа и использовать нейроакустические стимулы."
  }
];

const DigitalManifesto: React.FC = () => {
  return (
    <Section id="manifesto" className="bg-white">
      <SectionTitle subtitle="Будущее уже здесь">Почему ОНЛАЙН работает лучше?</SectionTitle>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <p className="text-xl font-serif italic text-dark-accent leading-relaxed">
            "Гипноз — это не магия прикосновений. Это магия Слова и Состояния. Интернет стал идеальным проводником для этой энергии."
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MANIFESTO_ITEMS.map((item, idx) => (
              <div key={idx} className="group p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gold/30 transition-all">
                <div className="mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="font-bold text-dark mb-2">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gold/20 blur-[100px] rounded-full"></div>
          <div className="relative bg-dark rounded-3xl overflow-hidden shadow-2xl border border-gold/20 aspect-square md:aspect-auto md:h-[500px]">
             <img 
               src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
               alt="Digital Connection" 
               className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
             <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Live Connection</span>
                </div>
                <h4 className="text-2xl font-serif font-bold text-white">Сессия через океаны</h4>
                <p className="text-sm text-gray-400 mt-2">Ваш голос звучит в наушниках клиента в Сиднее, пока вы пьете чай в Нови-Саде.</p>
             </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DigitalManifesto;
