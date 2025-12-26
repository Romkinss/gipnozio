import React, { useState, useEffect } from 'react';
import { Menu, X, Circle, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pulseText, setPulseText] = useState('Сейчас: набор 5 потока');

  const navLinks = [
    { target: "/", label: "Главная", isRoute: true },
    { target: "curriculum", label: "СТУДЕНТАМ", isRoute: false },
    { target: "/clients", label: "КЛИЕНТАМ", isRoute: true },
    { target: "/blog", label: "Блог", isRoute: true },
    { target: "/testimonials", label: "Отзывы", isRoute: true },
    { target: "/pulse", label: "Пульс", isRoute: true },
  ];

  useEffect(() => {
    const texts = [
      'Сейчас: набор 5 потока',
      'Event: Чай в Нови-Саде',
      'Live: Сессия урок Zoom',
      'Ретрит: 2-й день Пхукет',
      'Online: 250+ студентов',
      'Event: Митап в Москве',
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setPulseText(texts[i]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLElement>, target: string, isRoute: boolean = false) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (isRoute) {
        window.location.href = target;
        window.scrollTo(0, 0);
        return;
    }

    const scrollToElement = () => {
        const element = document.getElementById(target);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    if (location.pathname !== '/') {
        window.location.href = '/';
        setTimeout(scrollToElement, 100);
    } else {
        scrollToElement();
    }
  };

  return (
    <>
      <header className="bg-dark-accent text-white py-6 border-b-2 border-gold relative z-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6">
          <a href="/" className="w-24 h-24 bg-dark-accent rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] overflow-hidden flex items-center justify-center border border-gold/30">
            <img 
              src="https://api.gipnozio.ru/storage/v1/object/public/public-images/1766569860658_logo-gipnozio.webp" 
              alt="Eurasian Academy Logo" 
              className="w-full h-full object-cover"
            />
          </a>
          <div className="text-center md:text-left">
            <a href="/" className="text-2xl md:text-3xl font-serif font-bold tracking-wider text-white hover:text-gold transition-colors">
              Eurasian Academy of Hypnosis
            </a>
            <div className="flex flex-col md:flex-row items-center gap-3 mt-2">
              <p className="text-gold text-sm md:text-base font-light tracking-wide uppercase">Профессиональное ОНЛАЙН обучение</p>
              <div className="hidden md:flex items-center justify-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10 min-w-[185px]">
                <Circle size={8} className="text-red-500 fill-red-500 animate-pulse shrink-0" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block whitespace-nowrap">{pulseText}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 bg-light-secondary/95 backdrop-blur-md shadow-md border-b border-gray-100 z-40 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="hidden md:flex space-x-8 mx-auto items-center">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={(e) => handleNavigation(e, link.target, link.isRoute)}
                  className="text-dark-accent font-medium hover:text-gold transition-colors duration-300 text-sm uppercase tracking-wide cursor-pointer bg-transparent border-none"
                >
                  {link.label}
                </button>
              ))}

              <div className="h-4 w-px bg-gray-200 mx-2"></div>

              <button 
                onClick={(e) => handleNavigation(e, '/login', true)}
                className="text-gold font-bold hover:text-gold-dark transition-colors duration-300 text-sm uppercase tracking-wide border-b-2 border-transparent hover:border-gold"
              >
                Вход в кабинет
              </button>
            </div>

            <div className="md:hidden w-full flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-dark uppercase tracking-widest">GIPNOZIO</span>
                <Circle size={6} className="text-red-500 fill-red-500 animate-pulse" />
              </div>
              
              <div className="flex items-center gap-3">
                {/* Ghost-button ВХОД (мобильная версия) */}
                <a 
                  href="/login" 
                  className="px-4 py-1.5 border border-gold rounded-full text-[10px] font-bold text-gold uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-all duration-300 active:scale-95"
                  aria-label="Вход в кабинет"
                >
                  Вход
                </a>

                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-10 h-10 flex items-center justify-center text-dark hover:text-gold transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="flex flex-col py-4">
              <div className="px-6 py-2 mb-2 flex items-center gap-2">
                <Circle size={8} className="text-red-500 fill-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{pulseText}</span>
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={(e) => handleNavigation(e, link.target, link.isRoute)}
                  className="px-6 py-3 text-dark hover:bg-gold/10 hover:text-gold transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={(e) => handleNavigation(e, '/login', true)}
                className="px-6 py-3 text-gold font-bold bg-gray-50 mt-2 text-left"
              >
                Вход в кабинет
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;