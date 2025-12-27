import React, { useState, useEffect } from 'react';
import { Menu, X, Circle } from 'lucide-react';

interface NavLink {
  target: string;
  label: string;
  isRoute: boolean;
}

const NavbarMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pulseText, setPulseText] = useState('Сейчас: набор 5 потока');

  const navLinks: NavLink[] = [
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

    if (window.location.pathname !== '/') {
      window.location.href = '/';
      setTimeout(scrollToElement, 100);
    } else {
      scrollToElement();
    }
  };

  return (
    <nav className="sticky top-0 bg-light-secondary/95 backdrop-blur-md shadow-md border-b border-gray-100 z-40 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Navigation */}
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

            <a 
              href="/login"
              className="text-gold font-bold hover:text-gold-dark transition-colors duration-300 text-sm uppercase tracking-wide border-b-2 border-transparent hover:border-gold"
            >
              Вход в кабинет
            </a>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden w-full flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-dark uppercase tracking-widest">GIPNOZIO</span>
              <Circle size={6} className="text-red-500 fill-red-500 animate-pulse" />
            </div>
            
            <div className="flex items-center gap-3">
              <a 
                href="/login" 
                className="px-4 py-1.5 border border-gold rounded-full text-[10px] font-bold text-gold uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-all duration-300 active:scale-95"
              >
                Вход
              </a>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 flex items-center justify-center text-dark hover:text-gold transition-colors bg-transparent border-none cursor-pointer"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg left-0 right-0">
            <div className="flex flex-col py-4">
              <div className="px-6 py-2 mb-2 flex items-center gap-2">
                <Circle size={8} className="text-red-500 fill-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{pulseText}</span>
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={(e) => handleNavigation(e, link.target, link.isRoute)}
                  className="px-6 py-3 text-dark hover:bg-gold/10 hover:text-gold transition-colors text-left bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/login"
                className="px-6 py-3 text-gold font-bold bg-gray-50 mt-2 text-left"
              >
                Вход в кабинет
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarMenu;
