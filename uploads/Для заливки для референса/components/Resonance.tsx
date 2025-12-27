
import React from 'react';
import { Target, Zap, Heart, Search, Minus, Sparkles, ChevronRight } from 'lucide-react';

const PATHS = [
  {
    icon: <Zap className="w-8 h-8 text-gold" />,
    title: "Кризис Достигатора",
    subtitle: "Бизнес и ТОП-менеджмент",
    pain: [
      "Внешний успех есть, а внутренней радости — ноль",
      "Бессонница от бесконечного потока мыслей о контроле",
      "Ощущение, что вы 'тянете' всё на себе, и силы на исходе",
      "Деньги перестали зажигать, цели кажутся пустыми"
    ],
    outcome: "Вы вернете контроль над состоянием и начнете принимать решения из точки покоя."
  },
  {
    icon: <Heart className="w-8 h-8 text-gold" />,
    title: "Потолок Мастера",
    subtitle: "Психологи, коучи и эксперты",
    pain: [
      "Выгорание: клиенты 'не выздоравливают' до конца",
      "Синдром самозванца: страх поднять чек в 2-3 раза",
      "Ваши инструменты работают медленно в эпоху скоростей",
      "Ощущение, что вы отдаете больше, чем получаете взамен"
    ],
    outcome: "Вы освоите гипноз как 'скальпель' для подсознания, дающий результат за 1-2 сессии."
  },
  {
    icon: <Search className="w-8 h-8 text-gold" />,
    title: "Зов Подсознания",
    subtitle: "Смена вектора и поиск смыслов",
    pain: [
      "Половина жизни прожита, но вы не на своем месте",
      "Страх, что 'уже поздно', борется с желанием всё сменить",
      "Поиск глубоких знаний за пределами бытовой рутины",
      "Острое желание оставить след и реально помогать людям"
    ],
    outcome: "Вы превратите свой богатый жизненный опыт в фундамент новой, элитной профессии."
  }
];

const Resonance: React.FC = () => {
  return (
    <section id="resonance" className="py-20 md:py-32 bg-dark text-white border-y border-gold/20 relative overflow-hidden">
      {/* Фоновое свечение для глубины */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.03)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-8">
                <Sparkles size={14} className="text-gold" />
                <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">Для зрелых личностей</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                <span className="text-white block mb-2">Программа для тех, кто</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark italic">уже состоялся</span>
            </h2>
            
            <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                Средний возраст наших студентов — 38 лет. Здесь не учат молодежь «профессиям», 
                здесь мастера обретают глубину, а лидеры — внутреннюю тишину.
            </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {PATHS.map((path, idx) => (
            <div 
                key={idx} 
                className="group relative bg-dark-accent/30 border border-white/5 p-8 md:p-10 rounded-[2.5rem] hover:border-gold/40 transition-all duration-500 flex flex-col h-full shadow-2xl"
            >
                {/* Эффект наведения */}
                <div className="absolute inset-0 bg-gold/[0.02] opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity pointer-events-none"></div>

                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 group-hover:bg-gold/10 group-hover:border-gold/30 transition-all shadow-inner">
                    {path.icon}
                </div>

                <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-gold transition-colors">{path.title}</h3>
                <p className="text-gold/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">{path.subtitle}</p>

                <div className="space-y-5 mb-12 flex-grow">
                    {path.pain.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <Minus size={14} className="text-gold/40 shrink-0 mt-1.5" />
                            <span className="text-sm text-gray-300 leading-relaxed font-light italic">"{item}"</span>
                        </div>
                    ))}
                </div>

                <div className="mt-auto pt-8 border-t border-white/5">
                    <div className="flex items-start gap-3">
                        <ChevronRight size={18} className="text-gold shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-white leading-relaxed">
                            <span className="text-gold font-bold uppercase text-[10px] tracking-widest block mb-1">Ожидаемый результат:</span> 
                            {path.outcome}
                        </p>
                    </div>
                </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
                Идентификация смыслов • GIPNOZIO ACADEMY
            </p>
        </div>
      </div>
    </section>
  );
};

export default Resonance;
