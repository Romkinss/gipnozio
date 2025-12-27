
// Helper for transliteration (Cyrillic -> Latin slug)
const slugify = (text: string): string => {
  const ruChars: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
    'я': 'ya'
  };

  return text
    .toLowerCase()
    .split('')
    .map(char => ruChars[char] || char)
    .join('')
    .replace(/[^a-z0-9-]/g, '-') 
    .replace(/-+/g, '-')         
    .replace(/^-|-$/g, '');      
};

export const formatContent = (content: string): string => {
  if (!content) return '';

  let formatted = content;

  // --- AUTOMATIC INTERNAL LINKING ---
  const internalLinks = [
      { keyword: 'гипнотерапи', url: '/', root: 'гипнотерапи' }, 
      { keyword: 'психосоматик', url: '/blog?category=psychosomatics', root: 'психосоматик' },
      { keyword: 'Роман Третьяков', url: '/author/roman-tretiakov', root: 'Роман Третьяков' }
  ];

  internalLinks.forEach(link => {
      const regex = new RegExp(`(^|\\s)(${link.root}[а-я]*)(?=[\\s.,!?])`, 'i');
      formatted = formatted.replace(regex, `$1[$2](${link.url})`);
  });

  // --- MARKDOWN PROCESSING ---

  formatted = formatted.replace(/^\s*### (.*$)/gm, (match, title) => {
      const id = slugify(title);
      return `\n\n<h3 id="${id}">${title}</h3>\n\n`;
  });
  
  formatted = formatted.replace(/^\s*## (.*$)/gm, (match, title) => {
      const id = slugify(title);
      return `\n\n<h2 id="${id}">${title}</h2>\n\n`;
  });
  
  formatted = formatted.replace(/^\s*# (.*$)/gm, '\n\n<h1>$1</h1>\n\n');
  formatted = formatted.replace(/^\s*(\*\*\*|---|___)\s*$/gm, '<hr />');
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
  formatted = formatted.replace(/~~(.*?)~~/g, '<del>$1</del>');
  formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
  formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

  // Helper to process video URLs
  const processVideoUrl = (url: string) => {
    let embedUrl = url;
    
    // VK Video Очистка
    if (url.includes('vk.com/video') || url.includes('vkvideo.ru')) {
       // Удаляем любые фиксированные размеры width/height
       let cleanedUrl = url.replace(/[&?]width=\d+/g, '').replace(/[&?]height=\d+/g, '');
       
       if (cleanedUrl.includes('video_ext.php')) {
           return cleanedUrl;
       }
       
       const match = cleanedUrl.match(/video(-?\d+)_(\d+)/);
       if (match) {
           const oid = match[1];
           const id = match[2];
           const urlObj = new URL(cleanedUrl.startsWith('http') ? cleanedUrl : `https://${cleanedUrl}`);
           const hash = urlObj.searchParams.get('hash') || '';
           embedUrl = `https://vk.com/video_ext.php?oid=${oid}&id=${id}${hash ? `&hash=${hash}` : ''}&hd=2&autoplay=0`;
       }
    }
    return embedUrl;
  };

  formatted = formatted.replace(/\[video(?::([\d]+):([\d]+))?\]\(([^)]+)\)/g, (match, w, h, url) => {
    const embedUrl = processVideoUrl(url.trim());
    return `<div class="video-container"><iframe src="${embedUrl}" allow="autoplay; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe></div>`;
  });

  // Остальная разметка...
  formatted = formatted.replace(/!\[([^\]]*)\]\(([^)\s"]+)(?:\s+"([^"]+)")?\)(?:\{\.([a-z-]+)\})?/g, (match, alt, url, title, className) => {
    let style = 'height: auto;';
    let classes = 'article-image';
    const imgHtml = `<img src="${url}" alt="${alt}" title="${title || ''}" style="${style}" class="${classes}" loading="lazy" />`;
    return title ? `<figure>${imgHtml}<figcaption>${title}</figcaption></figure>` : imgHtml;
  });

  formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  formatted = formatted.replace(/^[\*\-] (.*)$/gm, '<UL_LI>$1</UL_LI>');
  formatted = formatted.replace(/^\d+\. (.*)$/gm, '<OL_LI>$1</OL_LI>');
  formatted = formatted.replace(/(?:<OL_LI>[\s\S]*?<\/OL_LI>\n?)+/g, (m) => '<ol>' + m.replace(/<OL_LI>([\s\S]*?)<\/OL_LI>/g, '<li>$1</li>').trim() + '</ol>');
  formatted = formatted.replace(/(?:<UL_LI>[\s\S]*?<\/UL_LI>\n?)+/g, (m) => '<ul>' + m.replace(/<UL_LI>([\s\S]*?)<\/UL_LI>/g, '<li>$1</li>').trim() + '</ul>');
  
  formatted = formatted.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');

  const paragraphs = formatted.split(/\n\n+/);
  formatted = paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<table') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<div') || trimmed.startsWith('<figure') || trimmed.startsWith('<pre')) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  }).join('\n\n');

  return formatted;
};

export const slugifyHeader = slugify;
