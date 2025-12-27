import React from 'react';
import { ChevronDown, CheckCircle2, Award, BookOpen } from 'lucide-react';

export interface ModuleData {
  id: number;
  title: string;
  topics: string[];
  footerText: string;
}

export const AccordionItem: React.FC<{ module: ModuleData; isOpen: boolean; onClick: () => void }> = ({ module, isOpen, onClick }) => {
  const isCertificate = module.footerText.toLowerCase().includes('сертификат');

  return (
    <div className={`mb-4 rounded-xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-gold shadow-lg shadow-gold/10 bg-white' : 'border-gray-200 bg-white hover:border-gold/50'}`}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left group bg-gradient-to-r from-transparent via-transparent to-transparent hover:from-gold/5 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold-dark text-xs font-bold uppercase tracking-wider w-fit">
            Модуль {module.id}
          </span>
          <span className={`font-semibold text-lg md:text-xl transition-colors ${isOpen ? 'text-gold-dark' : 'text-dark group-hover:text-gold-dark'}`}>
            {module.title}
          </span>
        </div>
        <ChevronDown 
          className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'transform rotate-180 text-gold' : 'group-hover:text-gold'}`} 
        />
      </button>
      
      <div 
        className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6 pt-0 border-t border-dashed border-gray-100">
          <ul className="space-y-3 mt-4">
            {module.topics.map((topic, idx) => (
              <li key={idx} className="flex items-start gap-3 text-dark-accent/80">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
          <div className={`mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 font-bold text-sm ${isCertificate ? 'text-gold-dark' : 'text-gray-500'}`}>
            {isCertificate ? <Award className="w-5 h-5" /> : <BookOpen className="w-4 h-4" />}
            <span>{module.footerText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};