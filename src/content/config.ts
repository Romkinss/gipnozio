import { defineCollection, z } from 'astro:content';

// Схема для статей блога
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string().optional(),
    author: z.string().default('Roman Tretiakov'),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    readingTime: z.number().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

// Схема для уроков
const lessonsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    duration: z.string(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    order: z.number(),
    module: z.string().optional(),
    objectives: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    resources: z.array(z.object({
      title: z.string(),
      url: z.string(),
      type: z.enum(['video', 'pdf', 'link', 'exercise']).optional(),
    })).optional(),
    videoUrl: z.string().optional(),
    videoTranscript: z.string().optional(),
    quiz: z.object({
      enabled: z.boolean().optional(),
      questions: z.number().optional(),
    }).optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  lessons: lessonsCollection,
};
