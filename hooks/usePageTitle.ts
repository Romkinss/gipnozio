import { useEffect } from 'react';

export const usePageTitle = (title: string, override: boolean = false) => {
  useEffect(() => {
    // Сохраняем предыдущий заголовок, хотя в SPA это может быть неактуально, 
    // так как следующая страница сразу установит свой.
    
    if (override) {
        document.title = title;
    } else {
        document.title = `${title} | Eurasian Academy of Hypnosis`;
    }
  }, [title, override]);
};