import React from 'react';
import { Send, Instagram, Youtube } from 'lucide-react';

interface AuthorBioProps {
  name?: string;
  image?: string;
  role?: string;
  bio?: string;
}

const AuthorBio: React.FC<AuthorBioProps> = ({ 
    name = "Роман Третьяков", 
    image = "https://raw.githubusercontent.com/Romkinss/guessay/main/Roman_gipnozio.jpg",
    role = "Гипнотерапевт, Коуч, Основатель Академии",
    bio = "Сертифицированный специалист с опытом более 10 лет. Помогаю людям освободиться от страхов, ограничивающих убеждений и выйти на новый уровень жизни через работу с подсознанием."
}) => {
  return (
    <div className="bg-gradient-to-br from-gold/5 to-transparent rounded-2xl p-8 border border-gold/20 flex flex-col sm:flex-row items-center sm:items-start gap-6 my-12">
        <div className="shrink-0">
            <div className="w-24 h-24 rounded-full p-1 border border-gold/30 bg-white">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full rounded-full object-cover"
                />
            </div>
        </div>
        
        <div className="text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 justify-center sm:justify-start">
                <h3 className="text-xl font-serif font-bold text-dark">{name}</h3>
                <span className="hidden sm:block text-gray-300">•</span>
                <span className="text-xs font-bold text-gold uppercase tracking-wider">{role}</span>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {bio}
            </p>
            
            <div className="flex items-center gap-4 justify-center sm:justify-start">
                <a href="https://t.me/Roman_Tretiakov" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#229ED9] transition-colors">
                    <Send size={20} />
                </a>
                <a href="https://www.instagram.com/gipnozio/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors">
                    <Instagram size={20} />
                </a>
                <a href="https://www.youtube.com/channel/UCgZN-nQK-LeX5S77cc36UxA" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors">
                    <Youtube size={20} />
                </a>
            </div>
        </div>
    </div>
  );
};

export default AuthorBio;