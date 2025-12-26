// Типы для приложения
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  category?: string;
  publishedAt: string;
  readingTime?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  image?: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  content: string;
}

export interface User {
  id: string;
  first_name: string;
  username?: string;
  photo_url?: string;
}
