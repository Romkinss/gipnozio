# GIPNOZIO - Динамические маршруты для блога и уроков

## Обзор

Этот документ описывает реализацию динамических маршрутов для блога и уроков в проекте GIPNOZIO, который использует Astro и Content Collections.

## Структура проекта

```
src/
├── content/
│   ├── blog/                    # Статьи блога (markdown файлы)
│   │   ├── hypnosis-basics.md
│   │   ├── stress-management.md
│   │   └── sleep-quality.md
│   ├── lessons/                 # Уроки (markdown файлы)
│   │   ├── introduction-to-hypnotherapy.md
│   │   └── induction-techniques.md
│   └── config.ts               # Конфигурация Content Collections
├── pages/
│   ├── blog/
│   │   ├── index.astro         # Главная страница блога
│   │   └── [slug].astro        # Динамический маршрут для статей
│   └── lessons/
│       ├── index.astro         # Главная страница уроков
│       └── [slug].astro        # Динамический маршрут для уроков
├── components/
│   ├── BlogPostView.tsx        # Компонент для отображения статей
│   ├── LessonView.tsx          # Компонент для отображения уроков
│   └── BreadcrumbsNav.tsx      # Компонент навигации
└── types/
    └── index.ts                # TypeScript типы
```

## Content Collections

### Конфигурация (src/content/config.ts)

Content Collections используются для управления контентом блога и уроков. Каждая коллекция имеет свою схему данных.

#### Схема для блога

```typescript
interface BlogPost {
  title: string;
  description: string;
  excerpt?: string;
  author: string;
  publishedAt: Date;
  updatedAt?: Date;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  readingTime?: number;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}
```

#### Схема для уроков

```typescript
interface LessonContent {
  title: string;
  description: string;
  duration: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  order: number;
  module?: string;
  objectives?: string[];
  prerequisites?: string[];
  resources?: Array<{
    title: string;
    url: string;
    type?: 'video' | 'pdf' | 'link' | 'exercise';
  }>;
  videoUrl?: string;
  videoTranscript?: string;
  quiz?: {
    enabled?: boolean;
    questions?: number;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}
```

## Добавление новых статей блога

### 1. Создайте markdown файл

Создайте новый файл в `src/content/blog/` с именем `your-slug.md`:

```markdown
---
title: "Название статьи"
description: "Краткое описание статьи"
excerpt: "Выдержка для списка статей"
author: "Roman Tretiakov"
publishedAt: 2024-01-20
category: "Категория"
tags: ["тег1", "тег2"]
featuredImage: "/images/blog/image.jpg"
featuredImageAlt: "Описание изображения"
readingTime: 10
seo:
  title: "SEO заголовок"
  description: "SEO описание"
  keywords: ["ключевое слово 1", "ключевое слово 2"]
---

## Заголовок

Содержание статьи...
```

### 2. Статья автоматически появится

- На странице `/blog` в списке статей
- По адресу `/blog/your-slug`
- С правильной навигацией между статьями
- С SEO оптимизацией

## Добавление новых уроков

### 1. Создайте markdown файл

Создайте новый файл в `src/content/lessons/` с именем `your-slug.md`:

```markdown
---
title: "Название урока"
description: "Описание урока"
duration: "45 минут"
level: "beginner"
order: 3
module: "Основы"
objectives:
  - "Цель 1"
  - "Цель 2"
prerequisites:
  - "previous-lesson"
videoUrl: "https://example.com/video"
resources:
  - title: "Ресурс 1"
    url: "https://example.com/resource"
    type: "pdf"
quiz:
  enabled: true
  questions: 5
seo:
  title: "SEO заголовок"
  description: "SEO описание"
  keywords: ["ключевое слово"]
---

## Содержание урока

Текст урока...
```

### 2. Урок автоматически появится

- На странице `/lessons` в списке уроков
- По адресу `/lessons/your-slug`
- Сгруппирован по модулям
- С правильной навигацией между уроками
- С индикатором прогресса

## Динамические маршруты

### Блог

#### `/blog` - Главная страница блога
- Отображает все статьи в виде карточек
- Сортирует по дате публикации (новые первыми)
- Показывает категории для фильтрации
- Отображает превью статей

#### `/blog/[slug]` - Отдельная статья
- Полный текст статьи
- Информация об авторе и дате
- Навигация между статьями (предыдущая/следующая)
- Breadcrumbs навигация
- SEO оптимизация
- Schema.org разметка

### Уроки

#### `/lessons` - Главная страница уроков
- Отображает все уроки, сгруппированные по модулям
- Показывает уровень сложности
- Отображает продолжительность
- CTA для начала обучения

#### `/lessons/[slug]` - Отдельный урок
- Полный текст урока
- Встроенное видео (если указано)
- Список целей урока
- Ресурсы для скачивания
- Навигация между уроками
- Индикатор прогресса
- Breadcrumbs навигация
- SEO оптимизация

## Компоненты

### BlogPostView.tsx

Компонент для отображения отдельной статьи блога.

**Props:**
- `title: string` - Заголовок статьи
- `author: string` - Автор
- `publishedAt: Date` - Дата публикации
- `category?: string` - Категория
- `tags?: string[]` - Теги
- `readingTime?: number` - Время чтения в минутах
- `content: string` - HTML контент
- `previousPost?: { slug: string; title: string }` - Предыдущая статья
- `nextPost?: { slug: string; title: string }` - Следующая статья

### LessonView.tsx

Компонент для отображения отдельного урока.

**Props:**
- `title: string` - Заголовок урока
- `description: string` - Описание
- `duration: string` - Продолжительность
- `level?: 'beginner' | 'intermediate' | 'advanced'` - Уровень
- `module?: string` - Модуль
- `objectives?: string[]` - Цели урока
- `content: string` - HTML контент
- `videoUrl?: string` - URL видео
- `resources?: Array<...>` - Ресурсы
- `previousLesson?: { slug: string; title: string }` - Предыдущий урок
- `nextLesson?: { slug: string; title: string }` - Следующий урок
- `progress?: number` - Прогресс в процентах

### BreadcrumbsNav.tsx

Компонент навигации с хлебными крошками.

**Props:**
- `items: Array<{ label: string; href: string }>` - Элементы навигации

## SEO оптимизация

### Для статей блога

Каждая статья включает:
- Meta теги (title, description, keywords)
- Open Graph теги для социальных сетей
- Canonical URL
- Schema.org разметка (BlogPosting)
- Автоматическое создание sitemap

### Для уроков

Каждый урок включает:
- Meta теги
- Open Graph теги
- Canonical URL
- Schema.org разметка (Course)

## Примеры использования

### Добавление статьи с изображением

```markdown
---
title: "Новая техника гипноза"
description: "Описание новой техники"
author: "Roman Tretiakov"
publishedAt: 2024-01-25
category: "Техники"
tags: ["гипноз", "техники", "практика"]
featuredImage: "/images/blog/new-technique.jpg"
featuredImageAlt: "Новая техника гипноза"
readingTime: 12
---

## Введение

Текст статьи...
```

### Добавление урока с видео и ресурсами

```markdown
---
title: "Продвинутые техники"
description: "Изучение продвинутых техник гипноза"
duration: "90 минут"
level: "advanced"
order: 5
module: "Продвинутые техники"
videoUrl: "https://youtube.com/embed/..."
resources:
  - title: "Рабочая тетрадь"
    url: "https://example.com/workbook.pdf"
    type: "pdf"
  - title: "Видео упражнение"
    url: "https://youtube.com/..."
    type: "video"
---

## Содержание

Текст урока...
```

## Сборка и развертывание

### Локальная разработка

```bash
npm run dev
```

Сайт будет доступен по адресу `http://localhost:3000`

### Сборка для продакшена

```bash
npm run build
```

Статические файлы будут созданы в папке `dist/`

### Предпросмотр

```bash
npm run preview
```

## Производительность

- Статические страницы генерируются во время сборки
- Нет необходимости в базе данных
- Быстрая загрузка страниц
- Оптимизированные изображения
- Кэширование на уровне CDN

## Будущие улучшения

- [ ] Поиск по статьям и урокам
- [ ] Комментарии к статьям
- [ ] Система рейтинга уроков
- [ ] Сертификаты после завершения курса
- [ ] Интеграция с системой управления обучением (LMS)
- [ ] Экспорт в PDF
- [ ] Многоязычная поддержка

## Поддержка

Для вопросов и предложений обратитесь к Roman Tretiakov.
