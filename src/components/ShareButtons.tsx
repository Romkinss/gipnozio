import React, { useState } from 'react';
import { Send, Copy, Check, MessageSquare } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'Telegram',
      icon: <Send size={18} className="-ml-0.5 mt-0.5 rotate-[-45deg]" />,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-[#229ED9] hover:text-white border-gray-200'
    },
    {
      name: 'VK',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.928 17.607c-.452-.284-1.258-.87-1.397-1.071-.242-.349-.12-.48.242-1.071 0 0 2.339-3.232 2.58-4.346.12-.558-.08-1.037-.847-1.037h-2.581c-.685 0-.968.349-1.129.742 0 0-1.33 3.144-3.226 5.196-.605.59-.887.786-1.21.786-.161 0-.403-.196-.403-.742v-4.152c0-.664-.161-.917-.726-.917H8.71c-.443 0-.726.312-.726.623 0 .633.927.783 1.048 2.535v3.668c0 .786-.161 1.071-.484 1.071-.847 0-2.822-3.144-4.032-6.725-.242-.742-.524-1.037-1.21-1.037H.726C0 11.085 0 11.434 0 11.827c0 .742.927 4.389 4.314 9.04 2.258 3.188 5.403 4.934 8.226 4.934 1.693 0 1.935-.393 1.935-1.037v-2.314c0-.742.161-.873.726-.873.403 0 1.089.196 2.621 1.66 1.774 1.789 2.056 2.587 3.064 2.587h2.581c.726 0 1.089-.393.887-1.114-.242-.7-1.129-1.747-2.435-3.116z" />
        </svg>
      ),
      href: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}`,
      color: 'hover:bg-[#0077FF] hover:text-white border-gray-200'
    },
    {
      name: 'WhatsApp',
      icon: <MessageSquare size={18} />,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-[#25D366] hover:text-white border-gray-200'
    }
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:block">Поделиться:</span>
      
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 rounded-full border flex items-center justify-center text-gray-500 transition-all duration-300 ${link.color}`}
          title={`Поделиться в ${link.name}`}
        >
          {link.icon}
        </a>
      ))}

      <button
        onClick={handleCopy}
        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${copied ? 'bg-green-500 text-white border-green-500' : 'border-gray-200 text-gray-500 hover:bg-dark hover:text-white'}`}
        title="Скопировать ссылку"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>
    </div>
  );
};

export default ShareButtons;