export interface Attachment {
  id: string;
  name: string;
  url: string;
  size?: string;
  type?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  category?: string;
  tags?: string;
  metaTitle?: string;
  metaDescription?: string;
  published: boolean;
  publishedAt: string;
  readingTime?: number;
  viewsCount?: number;
  // LMS fields
  is_lesson?: boolean;
  module_number?: number;
  lesson_order?: number;
  access_level?: number;
  attachments?: Attachment[];
  // News & Events fields
  is_featured_news?: boolean;
  event_date?: string;
  event_time?: string;
  marker_type?: 'live' | 'ceremony' | 'podcast' | 'lesson' | 'meetup' | 'case' | 'insight';
  external_url?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string; 
  age?: number;
  profession?: string; 
  rating: number;
  type: 'video' | 'image'; 
  mediaUrl: string; 
  thumbnailUrl?: string; 
  approved: boolean;
  featured: boolean;
  createdAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  source?: string;
  confirmed?: boolean;
  subscribedAt: string;
}

export interface Consultation {
  id: string;
  name: string;
  email?: string;
  phone: string;
  consultationType?: string;
  message?: string;
  source_page?: string;
  source_url?: string;
  status?: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  telegram_id: number;
  username: string;
  first_name: string;
  avatar_url: string;
  role_level: number;
  created_at: string;
}

export interface LessonProgress {
  id: string;
  telegram_id: number;
  lesson_id: string;
  is_completed: boolean;
  updated_at: string;
}

export interface UserNote {
  id: string;
  telegram_id: number;
  lesson_id: string;
  content: string;
  updated_at: string;
}

export interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: string;
  title: string;
  data: QuizQuestion[];
  created_at?: string;
}

export interface QuizResult {
  id: string;
  quiz_id: string;
  telegram_id: number;
  score: number;
  completed_at: string;
}

export interface SurveyStatement {
  id: string;
  text: string;
}

export interface Survey {
  id: string;
  title: string;
  statements: SurveyStatement[];
  created_at?: string;
}

export interface SurveyResult {
  id: string;
  survey_id: string;
  telegram_id: number;
  lesson_id: string;
  responses: Record<string, number>; // { statement_id: score_1_to_10 }
  updated_at: string;
}

export interface Redirect {
  id: string;
  from_path: string;
  to_path: string;
  created_at: string;
}