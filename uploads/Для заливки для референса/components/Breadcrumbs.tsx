import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  dark?: boolean; // If displayed on dark background
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '', dark = false }) => {
  if (!items || items.length === 0) return null;

  const textColor = dark ? 'text-gray-300' : 'text-gray-500';
  const activeColor = dark ? 'text-white' : 'text-dark';
  const hoverColor = 'hover:text-gold';
  const separatorColor = dark ? 'text-gray-600' : 'text-gray-300';

  return (
    <nav aria-label="Breadcrumb" className={`${className}`}>
      <ol className={`flex flex-wrap items-center gap-2 text-sm ${textColor}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item.path || index} className="flex items-center">
              {index > 0 && (
                <ChevronRight size={14} className={`mx-1 sm:mx-2 shrink-0 ${separatorColor}`} />
              )}
              
              {isLast ? (
                <span 
                    className={`font-medium truncate max-w-[200px] sm:max-w-md ${activeColor}`} 
                    aria-current="page"
                    title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <Link 
                  to={item.path} 
                  className={`${hoverColor} transition-colors flex items-center gap-1 duration-200`}
                >
                  {isFirst && <Home size={14} className="mb-0.5" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;