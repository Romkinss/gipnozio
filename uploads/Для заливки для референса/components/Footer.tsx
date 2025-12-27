import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Send } from 'lucide-react';

const Footer: React.FC = () => {
  const openContactWidget = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-contact-form'));
  };

  return (
    <footer className="bg-dark-accent text-white py-16 border-t-4 border-gold">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-10 opacity-50">
          <h4 className="text-2xl font-serif font-bold tracking-widest text-gold mb-2">GIPNOZIO</h4>
          <p className="text-xs uppercase tracking-[0.3em]">Eurasian Academy of Hypnosis</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto text-sm text-gray-400 mb-12 text-left md:text-center">
          <div>
            <h5 className="text-white font-bold mb-4 uppercase tracking-wider">СОЦ СЕТИ</h5>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.youtube.com/channel/UCgZN-nQK-LeX5S77cc36UxA" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold transition-colors flex items-center gap-2 h-7 md:justify-center"
                >
                  <Youtube size={18} /> YouTube
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/gipnozio/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold transition-colors flex items-center gap-2 h-7 md:justify-center"
                >
                  <Instagram size={18} /> Instagram
                </a>
              </li>
              <li>
                <a 
                  href="http://t.me/gipnozio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold transition-colors flex items-center gap-2 h-7 md:justify-center"
                >
                  <Send size={18} /> Telegram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 uppercase tracking-wider">Академия</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/author/roman-tretiakov" className="hover:text-gold transition-colors flex items-center h-7 md:justify-center">
                  О нас
                </Link>
              </li>
              <li><Link to="/blog" className="hover:text-gold transition-colors flex items-center h-7 md:justify-center">Блог</Link></li>
              <li>
                <button 
                    onClick={openContactWidget}
                    className="hover:text-gold transition-colors flex items-center h-7 md:justify-center w-full"
                >
                    Заказать звонок
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 uppercase tracking-wider">Документы</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/blog/policy" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors flex items-center h-7 md:justify-center">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link to="/blog/terms" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors flex items-center h-7 md:justify-center">
                  Пользовательское соглашение
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 text-gray-600 text-xs leading-relaxed">
          <p className="mb-2">&copy; {new Date().getFullYear()} GIPNOZIO Academy. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;