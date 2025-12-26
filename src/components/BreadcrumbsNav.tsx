import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <a href="/" className="flex items-center gap-1 hover:text-gold transition">
        <Home size={16} />
        <span>Главная</span>
      </a>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={16} className="text-gray-400" />
          {index === items.length - 1 ? (
            <span className="text-dark font-medium">{item.label}</span>
          ) : (
            <a href={item.href} className="hover:text-gold transition">
              {item.label}
            </a>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
