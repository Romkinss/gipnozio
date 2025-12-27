
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionBanners: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <>
      {/* Gold CTA Section */}
      <section className="bg-dark py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gold rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <button 
                  onClick={() => navigate('/login')}
                  className="relative w-full md:w-auto md:min-w-[400px] px-8 py-5 bg-gold hover:bg-gold-dark text-dark rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl tracking-wide"
                >
                    Начать бесплатно
                </button>
            </div>
            <p className="text-gray-500 text-sm mt-4 font-light">
                Получите полный доступ ко всем урокам и тестам 1-го модуля.
            </p>
        </div>
      </section>

      {/* Pink Warning Banner */}
      <section className="bg-[#fff1f0] border-y border-red-100 py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <p className="text-[#cf1322] font-medium text-sm md:text-base leading-relaxed">
                Предупреждение: Если вы не начнете действовать сейчас, через год вы будете жалеть, что не начали сегодня. Рынок растет, успейте занять свое место.
            </p>
        </div>
      </section>
    </>
  );
};

export default ActionBanners;
