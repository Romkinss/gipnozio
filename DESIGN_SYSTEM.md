# 🎨 ВИЗУАЛЬНАЯ СТРУКТУРА И ДИЗАЙН-СИСТЕМА

## 📐 ЦВЕТОВАЯ ПАЛИТРА

### Основные цвета:
```
Золото (Primary):
  - #D4AF37 (основной)
  - #F4E5B0 (светлый)
  - #B8941F (тёмный)
  - rgba(212, 175, 55, 0.1) (dim)

Чёрный (Dark):
  - #1A1A1A (основной)
  - #2C2C2C (accent)
  - #0F0F0F (очень тёмный для Hero)

Белый (Light):
  - #FAFAF8 (основной фон)
  - #FFFFFF (вторичный)

Серый (Neutral):
  - #4A4A4A (текст)
  - #6B6B6B (приглушённый текст)
  - #E8E8E8 (граница)
```

### Использование цветов:
- **Заголовки:** Чёрный (#1A1A1A) на белом фоне
- **Текст:** Чёрный (#1A1A1A) на белом фоне
- **Акценты:** Золото (#D4AF37) везде
- **Кнопки:** Золото (#D4AF37) с чёрным текстом
- **Hover:** Белый фон с чёрным текстом
- **Фон:** Белый (#FFFFFF) или очень светлый (#FAFAF8)
- **Тёмные секции:** Чёрный (#0F0F0F) с белым текстом

---

## 🔤 ТИПОГРАФИЯ

### Шрифты:
```
Заголовки (h1, h2, h3, h4, h5, h6):
  - Семейство: PT Serif
  - Вес: 700 (bold)
  - Размеры:
    - h1: 3.5rem (56px) на десктопе, 2rem (32px) на мобильном
    - h2: 2.5rem (40px) на десктопе, 1.75rem (28px) на мобильном
    - h3: 1.875rem (30px) на десктопе, 1.5rem (24px) на мобильном
    - h4: 1.5rem (24px)
    - h5: 1.25rem (20px)
    - h6: 1rem (16px)

Текст (p, span, div):
  - Семейство: PT Sans, Inter
  - Вес: 400 (regular)
  - Размеры:
    - Основной: 1rem (16px)
    - Большой: 1.125rem (18px)
    - Маленький: 0.875rem (14px)
    - Очень маленький: 0.75rem (12px)

Специальные:
  - Uppercase: text-transform: uppercase; letter-spacing: 0.1em;
  - Tracking: letter-spacing: 0.05em; (для обычного текста)
  - Tracking: letter-spacing: 0.3em; (для заголовков)
```

### Примеры использования:
```html
<!-- Заголовок h1 -->
<h1 class="text-4xl md:text-7xl lg:text-8xl font-serif font-bold">
  Станьте ОНЛАЙН Гипнотерапевтом
</h1>

<!-- Заголовок h2 -->
<h2 class="text-3xl md:text-5xl font-serif font-bold">
  Пульс Академии
</h2>

<!-- Основной текст -->
<p class="text-lg md:text-xl text-gray-600">
  Фундаментальное обучение искусству работы с подсознанием
</p>

<!-- Маленький текст с uppercase -->
<span class="text-xs font-bold uppercase tracking-[0.3em]">
  Digital-профессия будущего
</span>
```

---

## 🎯 КОМПОНЕНТЫ И СТИЛИ

### Кнопки

#### Основная кнопка (Primary):
```html
<button class="px-12 py-5 bg-gold hover:bg-white hover:text-dark text-dark font-bold rounded-xl transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-white/20 uppercase tracking-widest text-sm md:text-base transform hover:-translate-y-1 active:scale-95">
  НАЧАТЬ ПРАКТИКУ
</button>
```

**Стили:**
- Фон: `bg-gold` (#D4AF37)
- Текст: `text-dark` (#1A1A1A)
- Padding: `px-12 py-5` (48px 20px)
- Граница: `rounded-xl` (16px)
- Тень: `shadow-[0_10px_30px_rgba(212,175,55,0.3)]`
- Hover: `hover:bg-white hover:text-dark hover:shadow-white/20 hover:-translate-y-1`
- Active: `active:scale-95`

#### Вторичная кнопка (Secondary):
```html
<button class="px-12 py-5 border border-white/10 text-white hover:bg-white/5 backdrop-blur-sm font-bold rounded-xl transition-all uppercase tracking-widest text-sm md:text-base">
  УЗНАТЬ О КАРЬЕРЕ
</button>
```

**Стили:**
- Граница: `border border-white/10`
- Текст: `text-white`
- Фон: `hover:bg-white/5`
- Backdrop: `backdrop-blur-sm`

#### Кнопка входа (Ghost):
```html
<a href="/login" class="px-4 py-1.5 border border-gold rounded-full text-[10px] font-bold text-gold uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-all duration-300 active:scale-95">
  ВХОД
</a>
```

**Стили:**
- Граница: `border border-gold`
- Текст: `text-gold`
- Padding: `px-4 py-1.5` (16px 6px)
- Граница-радиус: `rounded-full`
- Hover: `hover:bg-gold hover:text-white`

---

### Карточки

#### Карточка с бордюром:
```html
<div class="bg-white rounded-xl p-8 border border-gold/20 hover:border-gold/50 transition-all hover:shadow-gold">
  <h3 class="text-xl font-serif font-bold text-dark-accent mb-3">
    Название
  </h3>
  <p class="text-gray-600">
    Описание
  </p>
</div>
```

**Стили:**
- Фон: `bg-white`
- Padding: `p-8` (32px)
- Граница: `border border-gold/20`
- Граница-радиус: `rounded-xl` (16px)
- Hover: `hover:border-gold/50 hover:shadow-gold`

---

### Секции

#### Светлая секция:
```html
<section class="py-20 md:py-32 bg-light-secondary">
  <div class="container mx-auto px-4">
    <!-- Контент -->
  </div>
</section>
```

**Стили:**
- Фон: `bg-light-secondary` (#FFFFFF)
- Padding: `py-20 md:py-32` (80px 128px)
- Container: `container mx-auto px-4`

#### Тёмная секция:
```html
<section class="bg-[#0F0F0F] text-white py-24 md:py-40 relative overflow-hidden">
  <div class="container mx-auto px-4 relative z-10">
    <!-- Контент -->
  </div>
</section>
```

**Стили:**
- Фон: `bg-[#0F0F0F]`
- Текст: `text-white`
- Padding: `py-24 md:py-40` (96px 160px)
- Overflow: `overflow-hidden`
- Z-index: `relative z-10`

---

### Эффекты фона

#### Blur-круги (для Hero):
```html
<div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px] animate-pulse"></div>
<div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px]"></div>
```

**Стили:**
- Позиция: `absolute`
- Размер: `w-[40%] h-[40%]`
- Фон: `bg-gold/10` или `bg-gold/5`
- Граница-радиус: `rounded-full`
- Blur: `blur-[120px]`
- Анимация: `animate-pulse`

#### Сетка (для Hero):
```html
<div class="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
```

**Стили:**
- Позиция: `absolute inset-0`
- Opacity: `opacity-[0.03]`
- Background: `radial-gradient(#D4AF37 0.5px, transparent 0.5px)`
- Background-size: `30px 30px`

---

## 🎬 АНИМАЦИИ

### Fade-in-up:
```css
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
```

**Использование:**
```html
<div class="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
  Контент
</div>
```

### Pulse:
```html
<div class="animate-pulse">
  Контент
</div>
```

### Hover эффекты:
```html
<!-- Поднятие при наведении -->
<button class="transform hover:-translate-y-1">
  Кнопка
</button>

<!-- Сжатие при клике -->
<button class="active:scale-95">
  Кнопка
</button>

<!-- Изменение цвета -->
<button class="hover:text-gold transition-colors duration-300">
  Кнопка
</button>
```

---

## 📱 АДАПТИВНОСТЬ

### Breakpoints:
```
Mobile: 0px - 640px (sm)
Tablet: 641px - 1024px (md)
Desktop: 1025px - 1280px (lg)
Large: 1281px+ (xl)
```

### Примеры:
```html
<!-- Текст меняется размер -->
<h1 class="text-4xl md:text-7xl lg:text-8xl">
  Заголовок
</h1>

<!-- Сетка меняется количество колонок -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <div>Карточка 1</div>
  <div>Карточка 2</div>
  <div>Карточка 3</div>
</div>

<!-- Padding меняется -->
<div class="px-4 md:px-8 lg:px-16">
  Контент
</div>

<!-- Flex направление меняется -->
<div class="flex flex-col md:flex-row gap-4">
  <div>Элемент 1</div>
  <div>Элемент 2</div>
</div>
```

---

## 🎨 ПРИМЕРЫ ПОЛНЫХ КОМПОНЕНТОВ

### Hero секция:
```html
<section id="hero" class="bg-[#0F0F0F] text-white py-24 md:py-40 relative overflow-hidden">
  <!-- Фоновые эффекты -->
  <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px] animate-pulse"></div>
  <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px]"></div>
  <div class="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>

  <div class="container mx-auto px-4 text-center relative z-10">
    <!-- Badge -->
    <div class="inline-block px-6 py-2 border border-gold/30 rounded-full mb-10 bg-gold/5 backdrop-blur-sm animate-fade-in-up">
      <span class="text-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
        Digital-профессия будущего
      </span>
    </div>

    <!-- Заголовок -->
    <h1 class="text-4xl md:text-7xl lg:text-8xl font-serif font-bold mb-10 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      Станьте <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark">ОНЛАЙН</span> <br />
      Гипнотерапевтом
    </h1>

    <!-- Описание -->
    <p class="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-14 leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      Фундаментальное обучение искусству работы с подсознанием через Zoom и Skype. 
      Помогайте людям из любой точки мира, живя там, где вам нравится.
    </p>

    <!-- Кнопки -->
    <div class="flex flex-col sm:flex-row justify-center gap-6 items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
      <button class="px-12 py-5 bg-gold hover:bg-white hover:text-dark text-dark font-bold rounded-xl transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-white/20 uppercase tracking-widest text-sm md:text-base w-full sm:w-auto transform hover:-translate-y-1 active:scale-95">
        НАЧАТЬ ПРАКТИКУ
      </button>
      <button class="px-12 py-5 border border-white/10 text-white hover:bg-white/5 backdrop-blur-sm font-bold rounded-xl transition-all uppercase tracking-widest text-sm md:text-base w-full sm:w-auto">
        УЗНАТЬ О КАРЬЕРЕ
      </button>
    </div>

    <!-- Статистика -->
    <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-50 grayscale hover:grayscale-0 transition-all duration-700 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
      <div>
        <div class="text-2xl font-bold text-gold">100%</div>
        <div class="text-[10px] uppercase tracking-widest">Онлайн формат</div>
      </div>
      <div>
        <div class="text-2xl font-bold text-gold">🌍 24/7</div>
        <div class="text-[10px] uppercase tracking-widest">Доступ из мира</div>
      </div>
      <div>
        <div class="text-2xl font-bold text-gold">🚀 6 мес</div>
        <div class="text-[10px] uppercase tracking-widest">До первых денег</div>
      </div>
      <div>
        <div class="text-2xl font-bold text-gold">💎 ROI</div>
        <div class="text-[10px] uppercase tracking-widest">Окупаемость x5</div>
      </div>
    </div>
  </div>
</section>
```

---

## 📊 ТАБЛИЦА РАЗМЕРОВ И ОТСТУПОВ

| Элемент | Размер | Примечание |
|---------|--------|-----------|
| Container padding | px-4 | На мобильном |
| Container padding | px-8 | На планшете |
| Container padding | px-16 | На десктопе |
| Section padding | py-20 md:py-32 | Вертикальный отступ |
| Card padding | p-8 | Внутренний отступ карточки |
| Button padding | px-12 py-5 | Основная кнопка |
| Button padding | px-4 py-1.5 | Маленькая кнопка |
| Gap между элементами | gap-4 | Маленький gap |
| Gap между элементами | gap-6 | Средний gap |
| Gap между элементами | gap-8 | Большой gap |

---

**Дата создания:** 27 декабря 2025  
**Версия:** 1.0  
**Статус:** Готово к использованию
