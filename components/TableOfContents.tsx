import React, { useEffect, useState } from 'react';
import { List, ChevronRight } from 'lucide-react';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headers: TocItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headers }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px' }
    );

    headers.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headers.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headers]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  if (headers.length < 2) return null;

  return (
    <nav className="toc-nav">
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-4 text-dark font-bold font-serif border-b border-gray-200 pb-2">
            <List size={18} className="text-gold" />
            <span>Содержание</span>
        </div>
        <ul className="space-y-3">
          {headers.map((header) => (
            <li 
              key={header.id} 
              style={{ paddingLeft: header.level === 3 ? '1rem' : '0' }}
            >
              <a
                href={`#${header.id}`}
                onClick={(e) => handleClick(e, header.id)}
                className={`flex items-start gap-2 text-sm transition-all duration-200 group ${
                  activeId === header.id 
                    ? 'text-gold-dark font-bold translate-x-1' 
                    : 'text-gray-600 hover:text-gold'
                }`}
              >
                <ChevronRight 
                    size={14} 
                    className={`mt-0.5 shrink-0 transition-opacity ${activeId === header.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} 
                />
                <span className="leading-snug">{header.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default TableOfContents;