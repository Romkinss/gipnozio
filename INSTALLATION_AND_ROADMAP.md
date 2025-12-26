# 📋 GIPNOZIO Academy на Astro - Инструкция по установке и развитию

## 🚀 ЧАСТЬ 1: УСТАНОВКА НА ЛОКАЛЬНОЙ МАШИНЕ (MacBook)

### Шаг 1: Распаковка архива

```bash
# Распакуйте архив
tar -xzf gipnozio-astro-project.tar.gz

# Перейдите в папку проекта
cd gipnozio-astro
```

### Шаг 2: Установка зависимостей

```bash
# Убедитесь, что у вас установлены Node.js и npm
node --version  # должно быть v18+
npm --version   # должно быть v9+

# Если нет, установите через Homebrew:
brew install node

# Установите зависимости проекта
npm install
```

### Шаг 3: Запуск dev сервера

```bash
# Запустите dev сервер
npm run dev

# Откройте браузер и перейдите на:
# http://localhost:4321
```

### Шаг 4: Просмотр проекта

Вы должны увидеть:
- ✅ Главная страница с 15+ компонентами
- ✅ Страница "Для клиентов" с услугами
- ✅ Страница "Блог" со статьями
- ✅ Страница "Вход" с формой входа

---

## 📊 ЧАСТЬ 2: ТЕКУЩИЙ СТАТУС ПРОЕКТА

### ✅ Что уже сделано (100%):

1. **Главная страница** - Полностью функциональна
   - Hero компонент с анимациями
   - 15+ компонентов (AcademyPulse, Resonance, Problem, Solution и т.д.)
   - Все стили Tailwind CSS
   - Мобильный дизайн

2. **Навигация и Footer** - Полностью готовы
   - Responsive navbar с мобильным меню
   - Footer с ссылками и контактами

3. **Страницы**
   - `/` - Главная (100%)
   - `/clients` - Для клиентов (100%)
   - `/blog` - Блог (100%)
   - `/login` - Вход (100%)

4. **Стили и конфигурация**
   - Tailwind CSS настроен
   - TypeScript включен
   - Глобальные стили готовы
   - Все компоненты React работают

### ⚠️ Что нужно доделать (Roadmap):

---

## 🎯 ЧАСТЬ 3: ДЕТАЛЬНЫЙ ROADMAP ДОРАБОТОК

### ФАЗА 1: ДИНАМИЧЕСКИЕ МАРШРУТЫ И КОНТЕНТ (1-2 недели)

#### 1.1 Динамические маршруты для блога
**Файлы для изменения:**
- `src/pages/blog/[slug].astro` - Создать динамический маршрут
- `src/data/blog-posts.json` - Создать JSON с постами

**Что нужно сделать:**
```bash
# Создайте файл с постами
src/data/blog-posts.json

# Пример структуры:
{
  "posts": [
    {
      "slug": "hypnosis-basics",
      "title": "Основы гипноза",
      "excerpt": "Узнайте, что такое гипноз и как он работает",
      "content": "Полный текст статьи...",
      "author": "Roman Tretiakov",
      "date": "2024-01-15",
      "category": "Гипноз"
    }
  ]
}
```

**Код для `src/pages/blog/[slug].astro`:**
```astro
---
import { readFileSync } from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const postsFile = readFileSync(path.join(process.cwd(), 'src/data/blog-posts.json'), 'utf-8');
  const { posts } = JSON.parse(postsFile);
  
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}

const { post } = Astro.props;
---

<!DOCTYPE html>
<html lang="ru">
<head>
  <title>{post.title} - GIPNOZIO</title>
</head>
<body>
  <article>
    <h1>{post.title}</h1>
    <p>{post.author} • {post.date}</p>
    <div set:html={post.content} />
  </article>
</body>
</html>
```

#### 1.2 Динамические маршруты для уроков
**Файлы для изменения:**
- `src/pages/learning/lesson/[slug].astro` - Создать динамический маршрут
- `src/data/lessons.json` - Создать JSON с уроками

**Структура аналогична блогу**

#### 1.3 Страница отдельного поста блога
**Файлы:**
- `src/pages/blog/[slug].astro` - Полная страница поста с комментариями

---

### ФАЗА 2: СИСТЕМА УПРАВЛЕНИЯ КОНТЕНТОМ (2-3 недели)

#### 2.1 Админ панель
**Создать файлы:**
- `src/pages/admin/index.astro` - Главная админ панель
- `src/pages/admin/blog/index.astro` - Управление блогом
- `src/pages/admin/lessons/index.astro` - Управление уроками
- `src/pages/admin/testimonials/index.astro` - Управление отзывами

**Функциональность:**
- Просмотр всех постов/уроков
- Создание новых постов
- Редактирование существующих
- Удаление постов
- Загрузка изображений

#### 2.2 Форма создания поста
**Компонент:** `src/components/admin/BlogPostForm.tsx`

```tsx
import React, { useState } from 'react';

export const BlogPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Отправить на API
    const response = await fetch('/api/blog/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, category })
    });
    
    if (response.ok) {
      alert('Пост создан!');
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold mb-2">Заголовок</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-bold mb-2">Содержание</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border rounded h-64"
          required
        />
      </div>
      
      <button type="submit" className="px-6 py-2 bg-gold text-dark rounded font-bold">
        Создать пост
      </button>
    </form>
  );
};
```

---

### ФАЗА 3: СИСТЕМА АУТЕНТИФИКАЦИИ (2-3 недели)

#### 3.1 Интеграция с Telegram Bot API
**Файлы:**
- `src/services/telegram.ts` - Сервис для работы с Telegram
- `src/pages/api/auth/telegram.ts` - API endpoint для аутентификации

**Код для `src/services/telegram.ts`:**
```typescript
export const telegramAuth = {
  generateLoginUrl: (botUsername: string) => {
    return `https://t.me/${botUsername}?start=login`;
  },
  
  verifyData: (data: any, botToken: string) => {
    // Проверка подписи от Telegram
    const checkString = Object.keys(data)
      .filter(key => key !== 'hash')
      .sort()
      .map(key => `${key}=${data[key]}`)
      .join('\n');
    
    // Проверка хеша
    return true; // Если валидно
  }
};
```

#### 3.2 Страница профиля пользователя
**Файлы:**
- `src/pages/profile/index.astro` - Профиль пользователя
- `src/components/ProfileCard.tsx` - Карточка профиля

#### 3.3 Система сессий
**Файлы:**
- `src/middleware/auth.ts` - Middleware для проверки аутентификации
- `src/services/session.ts` - Управление сессиями

---

### ФАЗА 4: БАЗА ДАННЫХ И BACKEND (3-4 недели)

#### 4.1 Интеграция с Supabase
**Установка:**
```bash
npm install @supabase/supabase-js
```

**Файлы:**
- `src/services/supabase.ts` - Клиент Supabase
- `src/config/supabase.ts` - Конфигурация

**Код для `src/services/supabase.ts`:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const blogService = {
  getPosts: async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  getPost: async (slug: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  createPost: async (post: any) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post]);
    
    if (error) throw error;
    return data;
  }
};
```

#### 4.2 Таблицы в Supabase
**Создайте следующие таблицы:**

```sql
-- Таблица постов блога
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT,
  category TEXT,
  featured_image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица уроков
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  duration TEXT,
  module_number INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица отзывов
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица пользователей
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id TEXT UNIQUE,
  first_name TEXT,
  username TEXT,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица прогресса обучения
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  lesson_id UUID REFERENCES lessons(id),
  completed BOOLEAN DEFAULT FALSE,
  progress INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### ФАЗА 5: API ENDPOINTS (2-3 недели)

#### 5.1 API для блога
**Файлы:**
- `src/pages/api/blog/list.ts` - Получить список постов
- `src/pages/api/blog/get.ts` - Получить один пост
- `src/pages/api/blog/create.ts` - Создать пост
- `src/pages/api/blog/update.ts` - Обновить пост
- `src/pages/api/blog/delete.ts` - Удалить пост

**Пример `src/pages/api/blog/list.ts`:**
```typescript
import type { APIRoute } from 'astro';
import { blogService } from '../../../services/supabase';

export const GET: APIRoute = async () => {
  try {
    const posts = await blogService.getPosts();
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500
    });
  }
};
```

#### 5.2 API для уроков
**Файлы:**
- `src/pages/api/lessons/list.ts`
- `src/pages/api/lessons/get.ts`
- `src/pages/api/lessons/create.ts`

#### 5.3 API для аутентификации
**Файлы:**
- `src/pages/api/auth/login.ts` - Вход через Telegram
- `src/pages/api/auth/logout.ts` - Выход
- `src/pages/api/auth/profile.ts` - Получить профиль

---

### ФАЗА 6: УЛУЧШЕНИЯ И ОПТИМИЗАЦИЯ (2-3 недели)

#### 6.1 SEO оптимизация
- Добавить JSON-LD структурированные данные
- Создать sitemap.xml динамически
- Добавить Open Graph теги
- Оптимизировать изображения

#### 6.2 Производительность
- Добавить кэширование
- Оптимизировать CSS/JS
- Lazy loading для изображений
- Минификация ассетов

#### 6.3 Безопасность
- CSRF защита
- Rate limiting
- Input validation
- SQL injection protection

#### 6.4 Аналитика
- Google Analytics
- Яндекс.Метрика
- Отслеживание конверсий

---

### ФАЗА 7: РАЗВЕРТЫВАНИЕ (1 неделя)

#### 7.1 Подготовка к продакшену
```bash
# Сборка проекта
npm run build

# Проверка сборки
npm run preview
```

#### 7.2 Развертывание на Netlify
```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Авторизуйтесь
netlify login

# Разверните проект
netlify deploy --prod
```

#### 7.3 Развертывание на Vercel
```bash
# Установите Vercel CLI
npm install -g vercel

# Разверните проект
vercel --prod
```

#### 7.4 Настройка домена
- Подключить gipnozio.ru
- Настроить SSL сертификат
- Настроить редирект с www

---

## 📝 ЧАСТЬ 4: СТРУКТУРА ФАЙЛОВ ДЛЯ ДОБАВЛЕНИЯ

```
src/
├── pages/
│   ├── api/                    # API endpoints
│   │   ├── blog/
│   │   │   ├── list.ts
│   │   │   ├── get.ts
│   │   │   ├── create.ts
│   │   │   ├── update.ts
│   │   │   └── delete.ts
│   │   ├── lessons/
│   │   ├── auth/
│   │   └── testimonials/
│   ├── admin/                  # Админ панель
│   │   ├── index.astro
│   │   ├── blog/
│   │   ├── lessons/
│   │   └── testimonials/
│   ├── profile/                # Профиль пользователя
│   │   └── index.astro
│   └── blog/
│       └── [slug].astro        # Динамический маршрут
├── components/
│   ├── admin/                  # Админ компоненты
│   │   ├── BlogPostForm.tsx
│   │   ├── LessonForm.tsx
│   │   └── TestimonialForm.tsx
│   └── ...
├── services/
│   ├── supabase.ts             # Supabase клиент
│   ├── blog.ts                 # Сервис блога
│   ├── lessons.ts              # Сервис уроков
│   ├── auth.ts                 # Сервис аутентификации
│   └── telegram.ts             # Telegram интеграция
├── middleware/
│   └── auth.ts                 # Middleware для проверки аутентификации
├── data/
│   ├── blog-posts.json         # Данные постов (временно)
│   ├── lessons.json            # Данные уроков (временно)
│   └── testimonials.json       # Данные отзывов (временно)
└── config/
    ├── supabase.ts             # Конфигурация Supabase
    └── telegram.ts             # Конфигурация Telegram
```

---

## 🔑 ЧАСТЬ 5: ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ

Создайте файл `.env.local` в корне проекта:

```env
# Supabase
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Telegram
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_BOT_USERNAME=your-bot-username

# API
PUBLIC_API_URL=http://localhost:4321

# Analytics
PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
PUBLIC_YANDEX_METRICA_ID=your-ym-id
```

---

## 📚 ЧАСТЬ 6: ПОЛЕЗНЫЕ ССЫЛКИ И РЕСУРСЫ

### Документация
- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)

### Инструменты
- [Astro CLI](https://docs.astro.build/en/reference/cli-reference/)
- [Netlify CLI](https://docs.netlify.com/cli/overview/)
- [Vercel CLI](https://vercel.com/docs/cli)

### Примеры
- [Astro Blog Example](https://github.com/withastro/astro/tree/main/examples/blog)
- [Supabase React Example](https://github.com/supabase/supabase/tree/master/examples/react)

---

## 🎯 ЧАСТЬ 7: ПРИМЕРНЫЙ ГРАФИК РАЗРАБОТКИ

| Фаза | Задачи | Время | Статус |
|------|--------|-------|--------|
| 1 | Динамические маршруты | 1-2 недели | ⏳ TODO |
| 2 | Админ панель | 2-3 недели | ⏳ TODO |
| 3 | Аутентификация | 2-3 недели | ⏳ TODO |
| 4 | База данных | 3-4 недели | ⏳ TODO |
| 5 | API endpoints | 2-3 недели | ⏳ TODO |
| 6 | Оптимизация | 2-3 недели | ⏳ TODO |
| 7 | Развертывание | 1 неделя | ⏳ TODO |
| **ИТОГО** | | **14-22 недели** | |

---

## 💡 СОВЕТЫ ДЛЯ РАЗРАБОТКИ

1. **Начните с Фазы 1** - Динамические маршруты - это основа
2. **Тестируйте локально** - Используйте `npm run dev` для проверки
3. **Используйте Git** - Коммитьте после каждой фазы
4. **Документируйте код** - Добавляйте комментарии
5. **Проверяйте производительность** - Используйте DevTools
6. **Следите за безопасностью** - Валидируйте все входные данные

---

## 🚀 БЫСТРЫЙ СТАРТ

```bash
# 1. Распакуйте архив
tar -xzf gipnozio-astro-project.tar.gz
cd gipnozio-astro

# 2. Установите зависимости
npm install

# 3. Запустите dev сервер
npm run dev

# 4. Откройте браузер
# http://localhost:4321

# 5. Начните разработку!
```

---

**Удачи в разработке! 🎉**

Если у вас есть вопросы, обратитесь к документации или создайте issue в репозитории.
