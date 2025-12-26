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

export interface BlogPost {
  id: string;
  slug: string;
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
  content: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface LessonContent {
  id: string;
  slug: string;
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
  content: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
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
