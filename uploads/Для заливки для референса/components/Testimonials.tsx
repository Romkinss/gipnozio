import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Section, SectionTitle } from './Layout';

const STUDENT_REVIEWS = [
  {
    id: 1,
    name: "Елена Соколова",
    role: "Практикующий психолог",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    content: "Изначально шла на курс, чтобы просто расширить инструментарий в работе с клиентами. Но получила гораздо больше — полную пересборку собственной личности. Материал структурирован идеально: никакой «воды», только рабочие протоколы. Теперь мои сессии стали в 3 раза эффективнее, а синдром самозванца исчез окончательно."
  },
  {
    id: 2,
    name: "Алексей Морозов",
    role: "Предприниматель",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    content: "Скептически относился к обучению гипнозу, думал, это только для врачей. Мне нужны были навыки для переговоров и управления стрессом. Курс превзошел ожидания. Я не только научился «читать» людей, но и убрал свои финансовые блоки. Обучение окупилось уже на втором месяце, когда я закрыл крупную сделку благодаря новому состоянию."
  },
  {
    id: 3,
    name: "Мария Вишневская",
    role: "Коуч, нутрициолог",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    content: "Долго искала наставника, который объяснит гипноз без мистики и эзотерики. Роман — именно такой учитель. Все четко, научно и по делу. Очень мощная практика в парах: мы начали работать друг с другом с первых дней. Ухожу с курса не просто с сертификатом, а с готовой частной практикой и очередью из клиентов."
  },
  {
    id: 4,
    name: "Дмитрий Кравцов",
    role: "Врач-невролог",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 5,
    content: "Как врачу, мне важно понимать физиологию процесса. Академия дает глубокую научную базу, объясняя механизмы работы мозга в трансе. Это мощнейший инструмент, который я теперь использую там, где медикаменты бессильны. Отдельное спасибо за модуль по психосоматике — это перевернуло мое представление о лечении."
  }
];

const Testimonials: React.FC = () => {
  return (
    <Section>
      <SectionTitle subtitle="Истории наших выпускников">Результаты обучения</SectionTitle>
      <div className="grid md:grid-cols-2 gap-8">
        {STUDENT_REVIEWS.map((review) => (
          <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 hover:shadow-gold/20 transition-all duration-300 relative group">
            
            {/* Декоративная кавычка */}
            <div className="absolute top-6 right-8 text-gold/10 group-hover:text-gold/20 transition-colors">
                <Quote size={48} fill="currentColor" />
            </div>

            <div className="flex items-start gap-4 z-10">
                <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-gold p-0.5 shrink-0 shadow-md" 
                />
                <div>
                    <h5 className="font-bold text-dark text-lg">{review.name}</h5>
                    <span className="text-xs text-gold font-bold uppercase tracking-wider">{review.role}</span>
                    <div className="flex text-gold mt-1">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="#D4AF37" />)}
                    </div>
                </div>
            </div>
            
            <div className="relative z-10">
                <p className="text-gray-600 italic leading-relaxed text-[15px]">
                    "{review.content}"
                </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;