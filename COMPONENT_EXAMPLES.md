# 🔧 ПРИМЕРЫ КОДА ДЛЯ КАЖДОГО КОМПОНЕНТА

## ФАЗА 1: ПОДГОТОВКА

### 1.1 Обновление tailwind.config.mjs

```javascript
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F4E5B0',
          dark: '#B8941F',
          dim: 'rgba(212, 175, 55, 0.1)',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          accent: '#2C2C2C',
        },
        light: {
          DEFAULT: '#FAFAF8',
          secondary: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['PT Sans', 'Inter', ...defaultTheme.fontFamily.sans],
        serif: ['PT Serif', ...defaultTheme.fontFamily.serif],
      },
      boxShadow: {
        'gold': '0 4px 20px -2px rgba(212, 175, 55, 0.25)',
        'gold-hover': '0 10px 25px -5px rgba(212, 175, 55, 0.4)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [],
}
```

### 1.2 Обновление src/globals.css

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url('/fonts/inter-v18-cyrillic_latin-300.woff2') format('woff2');
}

@font-face {
  font-family: 'PT Serif';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/pt-serif-v17-cyrillic_latin-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'PT Serif';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/pt-serif-v17-cyrillic_latin-700.woff2') format('woff2');
}

@font-face {
  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/pt-sans-v17-cyrillic_latin-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/pt-sans-v17-cyrillic_latin-700.woff2') format('woff2');
}

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg-primary: #FAFAF8;
  --color-bg-secondary: #FFFFFF;
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #4A4A4A;
  --color-text-muted: #6B6B6B;
  --color-gold-primary: #D4AF37;
  --color-gold-light: #F4E5B0;
  --color-gold-dark: #B8941F;
  --color-border-light: #E8E8E8;
  --color-accent-dark: #2C2C2C;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #D4AF37;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #B8941F;
}

.article-content {
  font-family: 'PT Sans', 'Inter', system-ui, sans-serif;
  color: #1a1a1a;
  line-height: 1.8;
  font-size: 1.125rem;
  letter-spacing: 0.3px;
}

.article-content h1, .article-content h2, .article-content h3 {
  font-family: 'PT Serif', serif;
  color: #1f2937;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.article-content h1 { font-size: 2.5rem; }
.article-content h2 { font-size: 2rem; }
.article-content h3 { font-size: 1.5rem; }

.article-content p { margin-bottom: 1.5rem; }

.article-content blockquote {
  border-left: 4px solid #D4AF37;
  padding: 2rem 2rem 2rem 2.5rem;
  margin: 2.5rem 0;
  font-style: italic;
  color: #4b5563;
  background: linear-gradient(135deg, rgba(244, 229, 176, 0.08) 0%, rgba(250, 250, 248, 0.95) 100%);
  border-radius: 0.75rem;
}

.article-content ul { list-style: disc; padding-left: 2rem; margin: 1rem 0; }
.article-content ol { list-style: decimal; padding-left: 2rem; margin: 1rem 0; }
.article-content li { margin-bottom: 0.8em; }

.article-image {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  margin: 2rem 0;
}

.video-container {
  position: relative !important;
  width: 100% !important;
  margin: 1.5rem 0 !important;
  overflow: hidden !important;
  aspect-ratio: 16 / 9 !important;
  border-radius: 0.75rem;
}

.video-container iframe {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  border: 0 !important;
}

.markdown-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 2.5rem 0;
  border-radius: 0.75rem;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.markdown-table thead {
  background: linear-gradient(135deg, #D4AF37 0%, #F4E5B0 100%);
}

.markdown-table th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 700;
  font-family: 'PT Serif', serif;
  border-bottom: 3px solid #B8941F;
}

.markdown-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #E8E8E8;
}
```

---

## ФАЗА 2: LAYOUT И БАЗОВЫЕ КОМПОНЕНТЫ

### 2.1 src/layouts/MainLayout.astro

```astro
---
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { title, description = 'Eurasian Academy of Hypnosis - Профессиональное онлайн обучение гипнотерапии', image = 'https://api.gipnozio.ru/storage/v1/object/public/public-images/1766569860658_logo-gipnozio.webp' } = Astro.props;
---

<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </head>
  <body class="bg-light-secondary text-dark-accent">
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### 2.2 src/components/Navbar.astro

```astro
---
import { Menu, X, Circle, User } from 'lucide-react';

const navLinks = [
  { target: "/", label: "ГЛАВНАЯ", isRoute: true },
  { target: "curriculum", label: "СТУДЕНТАМ", isRoute: false },
  { target: "/clients", label: "КЛИЕНТАМ", isRoute: true },
  { target: "/blog", label: "БЛОГ", isRoute: true },
  { target: "/testimonials", label: "ОТЗЫВЫ", isRoute: true },
  { target: "/pulse", label: "ПУЛЬС", isRoute: true },
];
---

<>
  <header class="bg-dark-accent text-white py-6 border-b-2 border-gold relative z-50">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6">
      <a href="/" class="w-24 h-24 bg-dark-accent rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] overflow-hidden flex items-center justify-center border border-gold/30">
        <img 
          src="https://api.gipnozio.ru/storage/v1/object/public/public-images/1766569860658_logo-gipnozio.webp" 
          alt="Eurasian Academy Logo" 
          class="w-full h-full object-cover"
        />
      </a>
      <div class="text-center md:text-left">
        <a href="/" class="text-2xl md:text-3xl font-serif font-bold tracking-wider text-white hover:text-gold transition-colors">
          Eurasian Academy of Hypnosis
        </a>
        <div class="flex flex-col md:flex-row items-center gap-3 mt-2">
          <p class="text-gold text-sm md:text-base font-light tracking-wide uppercase">Профессиональное ОНЛАЙН обучение</p>
          <div class="hidden md:flex items-center justify-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10 min-w-[185px]">
            <Circle size={8} class="text-red-500 fill-red-500 animate-pulse shrink-0" />
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block whitespace-nowrap">Сейчас: набор 5 потока</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <nav class="sticky top-0 bg-light-secondary/95 backdrop-blur-md shadow-md border-b border-gray-100 z-40 transition-all duration-300">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="hidden md:flex space-x-8 mx-auto items-center">
          {navLinks.map((link) => (
            <a
              href={link.target}
              class="text-dark-accent font-medium hover:text-gold transition-colors duration-300 text-sm uppercase tracking-wide"
            >
              {link.label}
            </a>
          ))}

          <div class="h-4 w-px bg-gray-200 mx-2"></div>

          <a 
            href="/login"
            class="text-gold font-bold hover:text-gold-dark transition-colors duration-300 text-sm uppercase tracking-wide border-b-2 border-transparent hover:border-gold"
          >
            ВХОД В КАБИНЕТ
          </a>
        </div>

        <div class="md:hidden w-full flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="font-serif font-bold text-dark uppercase tracking-widest">GIPNOZIO</span>
            <Circle size={6} class="text-red-500 fill-red-500 animate-pulse" />
          </div>
          
          <div class="flex items-center gap-3">
            <a 
              href="/login" 
              class="px-4 py-1.5 border border-gold rounded-full text-[10px] font-bold text-gold uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-all duration-300 active:scale-95"
            >
              ВХОД
            </a>

            <button 
              class="w-10 h-10 flex items-center justify-center text-dark hover:text-gold transition-colors"
              id="menu-toggle"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</>

<script>
  const menuToggle = document.getElementById('menu-toggle');
  // Мобильное меню логика
</script>
```

### 2.3 src/components/Footer.astro

```astro
---
import { Youtube, Instagram, Send } from 'lucide-react';
---

<footer class="bg-dark-accent text-white py-16 border-t-4 border-gold">
  <div class="container mx-auto px-4 text-center">
    <div class="mb-10 opacity-50">
      <h4 class="text-2xl font-serif font-bold tracking-widest text-gold mb-2">GIPNOZIO</h4>
      <p class="text-xs uppercase tracking-[0.3em]">Eurasian Academy of Hypnosis</p>
    </div>
    <div class="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto text-sm text-gray-400 mb-12 text-left md:text-center">
      <div>
        <h5 class="text-white font-bold mb-4 uppercase tracking-wider">СОЦ СЕТИ</h5>
        <ul class="space-y-3">
          <li>
            <a 
              href="https://www.youtube.com/channel/UCgZN-nQK-LeX5S77cc36UxA" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="hover:text-gold transition-colors flex items-center gap-2 h-7 md:justify-center"
            >
              <Youtube size={18} /> YouTube
            </a>
          </li>
          <li>
            <a 
              href="https://www.instagram.com/gipnozio/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="hover:text-gold transition-colors flex items-center gap-2 h-7 md:justify-center"
            >
              <Instagram size={18} /> Instagram
            </a>
          </li>
          <li>
            <a 
              href="http://t.me/gipnozio" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="hover:text-gold transition-colors flex items-center gap-2 h-7 md:justify-center"
            >
              <Send size={18} /> Telegram
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h5 class="text-white font-bold mb-4 uppercase tracking-wider">АКАДЕМИЯ</h5>
        <ul class="space-y-3">
          <li>
            <a href="/author/roman-tretiakov" class="hover:text-gold transition-colors flex items-center h-7 md:justify-center">
              О нас
            </a>
          </li>
          <li><a href="/blog" class="hover:text-gold transition-colors flex items-center h-7 md:justify-center">Блог</a></li>
          <li>
            <button 
              class="hover:text-gold transition-colors flex items-center h-7 md:justify-center w-full"
              id="contact-btn"
            >
              Заказать звонок
            </button>
          </li>
        </ul>
      </div>
      <div>
        <h5 class="text-white font-bold mb-4 uppercase tracking-wider">ДОКУМЕНТЫ</h5>
        <ul class="space-y-3">
          <li>
            <a href="/blog/policy" target="_blank" rel="noopener noreferrer" class="hover:text-gold transition-colors flex items-center h-7 md:justify-center">
              Политика конфиденциальности
            </a>
          </li>
          <li>
            <a href="/blog/terms" target="_blank" rel="noopener noreferrer" class="hover:text-gold transition-colors flex items-center h-7 md:justify-center">
              Пользовательское соглашение
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="pt-8 border-t border-white/5 text-gray-600 text-xs leading-relaxed">
      <p class="mb-2">&copy; {new Date().getFullYear()} GIPNOZIO Academy. Все права защищены.</p>
    </div>
  </div>
</footer>
```

---

## ФАЗА 3: ГЛАВНАЯ СТРАНИЦА - HERO

### 3.1 src/components/Hero.tsx

```tsx
import React from 'react';

const Hero: React.FC = () => {
  const scrollToCTA = () => {
    const element = document.getElementById('cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProgram = () => {
    const element = document.getElementById('curriculum');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="bg-[#0F0F0F] text-white py-24 md:py-40 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px]"></div>
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        
        {/* Badge with glassmorphism */}
        <div className="inline-block px-6 py-2 border border-gold/30 rounded-full mb-10 bg-gold/5 backdrop-blur-sm animate-fade-in-up">
          <span className="text-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
            Digital-профессия будущего
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold mb-10 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Станьте <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark">ОНЛАЙН</span> <br />
          Гипнотерапевтом
        </h1>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-14 leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Фундаментальное обучение искусству работы с подсознанием через Zoom и Skype. 
          Помогайте людям из любой точки мира, живя там, где вам нравится.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <button 
            onClick={scrollToCTA}
            className="px-12 py-5 bg-gold hover:bg-white hover:text-dark text-dark font-bold rounded-xl transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-white/20 uppercase tracking-widest text-sm md:text-base w-full sm:w-auto transform hover:-translate-y-1 active:scale-95"
          >
            НАЧАТЬ ПРАКТИКУ
          </button>
          <button 
            onClick={scrollToProgram}
            className="px-12 py-5 border border-white/10 text-white hover:bg-white/5 backdrop-blur-sm font-bold rounded-xl transition-all uppercase tracking-widest text-sm md:text-base w-full sm:w-auto"
          >
            УЗНАТЬ О КАРЬЕРЕ
          </button>
        </div>

        {/* Floating statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-50 grayscale hover:grayscale-0 transition-all duration-700 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div>
            <div className="text-2xl font-bold text-gold">100%</div>
            <div className="text-[10px] uppercase tracking-widest">Онлайн формат</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gold">🌍 24/7</div>
            <div className="text-[10px] uppercase tracking-widest">Доступ из мира</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gold">🚀 6 мес</div>
            <div className="text-[10px] uppercase tracking-widest">До первых денег</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gold">💎 ROI</div>
            <div className="text-[10px] uppercase tracking-widest">Окупаемость x5</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

---

## ФАЗА 4: ГЛАВНАЯ СТРАНИЦА - ОСТАЛЬНЫЕ СЕКЦИИ

### 4.1 src/components/AcademyPulse.tsx

```tsx
import React from 'react';

const AcademyPulse: React.FC = () => {
  return (
    <section id="academy-pulse" className="py-20 md:py-32 bg-light-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-accent mb-6">
            Пульс Академии
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Живая информация о текущих событиях, наборах и активностях в академии
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Pulse item 1 */}
          <div className="bg-white rounded-xl p-8 border border-gold/20 hover:border-gold/50 transition-all hover:shadow-gold">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-gold font-bold uppercase text-sm">LIVE</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-dark-accent mb-3">
              Набор 5 потока
            </h3>
            <p className="text-gray-600">
              Открыта регистрация на новый поток обучения. Ограниченное количество мест.
            </p>
          </div>

          {/* Pulse item 2 */}
          <div className="bg-white rounded-xl p-8 border border-gold/20 hover:border-gold/50 transition-all hover:shadow-gold">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-gold font-bold uppercase text-sm">EVENT</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-dark-accent mb-3">
              Ретрит в Пхукете
            </h3>
            <p className="text-gray-600">
              Интенсивный 7-дневный ретрит для студентов и выпускников академии.
            </p>
          </div>

          {/* Pulse item 3 */}
          <div className="bg-white rounded-xl p-8 border border-gold/20 hover:border-gold/50 transition-all hover:shadow-gold">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gold font-bold uppercase text-sm">ONLINE</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-dark-accent mb-3">
              250+ студентов
            </h3>
            <p className="text-gray-600">
              Присоединяйтесь к растущему сообществу гипнотерапевтов со всего мира.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyPulse;
```

---

**Продолжение в следующем файле...**

Этот документ содержит примеры кода для всех основных компонентов. Каждый пример показывает:
- Точную структуру HTML
- Правильные классы Tailwind
- Цвета и шрифты
- Анимации и эффекты
- Адаптивность для мобильных устройств
