
import React, { useEffect } from 'react';
import PublicLayout from '../../PublicLayout';
import SEO from '../../SEO';
import { Shield, Sparkles, Eye, Mic2, Compass, MessageCircle, ChevronRight, Volume2 } from 'lucide-react';

const ClientPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PublicLayout>
      <SEO 
        title="Гипнотерапия для бизнесменов - GIPNOZIO"
        description="Эксклюзивный формат трансформации для тех, кто готов услышать свое подсознание. Работа с Романом Третьяков."
        url="/clients"
      />

      <div className="bg-[#0F0F0F] text-white font-sans overflow-hidden">
        
        {/* SECTION 1: HERO - THE THRESHOLD */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
             <img 
                src="https://api.gipnozio.ru/storage/v1/object/public/public-images/1766608030960_photo-1518531933037.webp" 
                className="w-full h-full object-cover grayscale opacity-30" 
                alt="Atmosphere"
             />
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 border border-gold/30 rounded-full mb-12 bg-gold/5 backdrop-blur-sm animate-fade-in-up">
              <Sparkles size={14} className="text-gold" />
              <span className="text-[10px] md:text-xs font-bold text-gold uppercase tracking-[0.4em]">Very Important Presence</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-10 leading-[1.1] tracking-tight">
              Ваш статус <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark italic">остается за дверью</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-16 italic">
              «Здесь мы не обслуживаем ваше Эго. Мы создаем тишину, в которой ваше Подсознание наконец-то сможет заговорить».
            </p>
            
            <div className="flex justify-center">
                <div className="h-20 w-px bg-gradient-to-b from-gold to-transparent"></div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE NEW V.I.P. PHILOSOPHY */}
        <section className="bg-white text-dark py-24 md:py-40">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                    Для нас V.I.P. — это <br />
                    <span className="text-gold">Ваше Подсознание</span>
                  </h2>
                  <p className="text-xl text-gray-500 font-light leading-relaxed">
                    В обычном мире вы — лидер, стратег, опора. Но внутри живет Тот, кто годами подавлял свои страхи и желания ради вашего успеха. Он — наш главный гость.
                  </p>
                </div>

                <div className="grid gap-8">
                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
                      <Shield size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Абсолютная безопасность</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Подсознание говорит только тогда, когда чувствует себя в полной безопасности. Мы создаем пространство, где любая правда будет принята без осуждения.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
                      <Volume2 size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Право быть услышанным</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Мы не будем «облизывать» вашу персону. Мы будем внимательно слушать импульсы вашей интуиции и тела, которые вы привыкли игнорировать.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gold/20 blur-[120px] rounded-full translate-x-1/4"></div>
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
                  <img 
                    src="https://api.gipnozio.ru/storage/v1/object/public/public-images/1766608016712_photo-1551590192.webp" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                    alt="Depth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">Insight</div>
                    <p className="text-2xl font-serif italic">«Роскошь перестать <br /> притворяться»</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CORE SERVICES - FULL WIDTH HORIZONTAL */}
        <section className="bg-dark py-32 border-y border-white/5">
           <div className="container mx-auto px-4 mb-20">
              <h2 className="text-3xl md:text-5xl font-serif text-center mb-6">Инструменты трансформации</h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto font-light">Для тех, кому нужен не процесс, а фундаментальный результат на уровне нейронных связей.</p>
           </div>

           <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[700px]">
              {/* Option 1 */}
              <div className="flex-1 relative group overflow-hidden border-r border-white/5 min-h-[500px]">
                <img src="https://api.gipnozio.ru/storage/v1/object/public/public-images/1766608001154_photo-1470770841072.webp" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000" alt="Individual" />
                <div className="relative z-10 h-full p-12 flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
                  <div className="text-gold font-bold text-xs tracking-widest mb-4 uppercase">Direct Contact</div>
                  <h3 className="text-3xl font-serif font-bold mb-6">Индивидуальная прошивка</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 h-[100px]">
                    Цикл из 5–8 глубоких сессий для удаления «багов» в психике: от выгорания и панических атак до финансовых потолков и родовых программ.
                  </p>
                  <div className="h-px w-0 group-hover:w-full bg-gold transition-all duration-700"></div>
                </div>
              </div>

              {/* Option 2 */}
              <div className="flex-1 relative group overflow-hidden border-r border-white/5 min-h-[500px]">
                <img src="https://api.gipnozio.ru/storage/v1/object/public/public-images/1766607982299_photo-1506126613408.webp" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000" alt="Retreat" />
                <div className="relative z-10 h-full p-12 flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
                  <div className="text-gold font-bold text-xs tracking-widest mb-4 uppercase">Global Experience</div>
                  <h3 className="text-3xl font-serif font-bold mb-6">Ретриты и Священные церемонии</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 h-[100px]">
                    Погружение в измененные состояния сознания в Сербии, Тайланде, Бали. Работа с растениями-учителями в сопровождении мастера.
                  </p>
                  <div className="h-px w-0 group-hover:w-full bg-gold transition-all duration-700"></div>
                </div>
              </div>

              {/* Option 3 */}
              <div className="flex-1 relative group overflow-hidden min-h-[500px]">
                <img src="https://api.gipnozio.ru/storage/v1/object/public/public-images/1766607545303_photo-1519389950473-47ba0277781c.webp" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000" alt="Hypnogram" />
                <div className="relative z-10 h-full p-12 flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
                  <div className="text-gold font-bold text-xs tracking-widest mb-4 uppercase">Personal Tech</div>
                  <h3 className="text-3xl font-serif font-bold mb-6">Гипнограммы силы и спокойствия</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 h-[100px]">
                    Индивидуально записанные аудио-протоколы. Ваш персональный «пульт управления» состоянием, доступный в любую секунду в ваших наушниках.
                  </p>
                  <div className="h-px w-0 group-hover:w-full bg-gold transition-all duration-700"></div>
                </div>
              </div>
           </div>
        </section>

        {/* SECTION 4: THE MASTER */}
        <section className="py-32 md:py-48 bg-[#FAF9F6] text-dark">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gold/10 -m-4 rounded-3xl transform -rotate-3"></div>
                  <img 
                    src="https://api.gipnozio.ru/storage/v1/object/public/public-images/1766585470128_Roman_gipnozio.webp" 
                    className="relative rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" 
                    alt="Роман Третьяков"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-8">
                <h3 className="text-4xl font-serif font-bold">Роман Третьяков</h3>
                <p className="text-gold font-bold uppercase tracking-widest text-xs">Проводник и Хранитель вашего процесса</p>
                <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                  <p>«Моя роль в VIP-сегменте — не быть вашим другом или консультантом. Я — защитник интересов вашего подсознания».</p>
                  <p>«Я работаю там, где классическая психология бессильна, а логика заходит в тупик. Мы не будем анализировать проблемы — мы будем их устранять».</p>
                </div>
                <div className="pt-8 flex items-center gap-8 border-t border-gray-200">
                   <div className="text-center">
                      <div className="text-3xl font-bold">15+</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">лет опыта</div>
                   </div>
                   <div className="text-center">
                      <div className="text-3xl font-bold">5000+</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">сессий</div>
                   </div>
                   <div className="text-center">
                      <div className="text-3xl font-bold">∞</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">конфиденциально</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CALL TO ACTION - THE FINAL DOOR */}
        <section className="py-32 bg-dark text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]"></div>
          
          <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10 leading-tight">
              Готовы к <br />
              <span className="text-gold">честному диалогу?</span>
            </h2>
            <p className="text-xl text-gray-400 font-light mb-16 leading-relaxed max-w-2xl mx-auto">
              Индивидуальная работа начинается с диагностики. Это встреча, где мы определим, готово ли ваше подсознание к изменениям сейчас.
            </p>
            
            <div className="flex flex-col items-center gap-8">
              <a 
                href="https://t.me/Roman_Tretiakov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-4 bg-white text-dark px-12 py-6 rounded-2xl font-bold text-xl transition-all hover:bg-gold hover:text-white shadow-2xl hover:shadow-gold/40"
              >
                Начать диалог в Telegram
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </a>
              
              <div className="flex flex-col md:flex-row items-center gap-10 opacity-40">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                  <Shield size={14} className="text-gold" /> Полная анонимность
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                  <Compass size={14} className="text-gold" /> Глобальный охват
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                  <Mic2 size={14} className="text-gold" /> Авторский метод
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
};

export default ClientPage;
