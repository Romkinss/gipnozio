
import { Article, Testimonial } from '../types';

/**
 * Статьи: Преобразование из БД в модель приложения
 */
export const mapArticleFromDB = (row: any): Article => ({
    ...row,
    featuredImage: row.featured_image || row.featuredImage,
    featuredImageAlt: row.featured_image_alt || row.featuredImageAlt, 
    publishedAt: row.published_at || row.publishedAt,
    readingTime: row.reading_time || row.readingTime,
    metaTitle: row.meta_title || row.metaTitle,
    metaDescription: row.meta_description || row.metaDescription,
    viewsCount: row.views_count || row.viewsCount,
    attachments: row.attachments || [],
    // News & Events
    is_featured_news: row.is_featured_news || false,
    event_date: row.event_date,
    event_time: row.event_time,
    marker_type: row.marker_type,
    external_url: row.external_url,
});

/**
 * Статьи: Подготовка для сохранения в БД
 */
export const mapArticleToDB = (article: Partial<Article>) => {
    const dbObj: any = { ...article };
    if (article.featuredImage !== undefined) dbObj.featured_image = article.featuredImage;
    if (article.featuredImageAlt !== undefined) dbObj.featured_image_alt = article.featuredImageAlt; 
    if (article.publishedAt !== undefined) dbObj.published_at = article.publishedAt;
    if (article.readingTime !== undefined) dbObj.reading_time = article.readingTime;
    if (article.metaTitle !== undefined) dbObj.meta_title = article.metaTitle;
    if (article.metaDescription !== undefined) dbObj.meta_description = article.metaDescription;
    if (article.viewsCount !== undefined) dbObj.views_count = article.viewsCount;
    
    // News mapping
    if (article.is_featured_news !== undefined) dbObj.is_featured_news = article.is_featured_news;
    if (article.event_date !== undefined) dbObj.event_date = article.event_date;
    if (article.event_time !== undefined) dbObj.event_time = article.event_time;
    if (article.marker_type !== undefined) dbObj.marker_type = article.marker_type;
    if (article.external_url !== undefined) dbObj.external_url = article.external_url;

    delete dbObj.featuredImage;
    delete dbObj.featuredImageAlt;
    delete dbObj.publishedAt;
    delete dbObj.readingTime;
    delete dbObj.metaTitle;
    delete dbObj.metaDescription;
    delete dbObj.viewsCount;
    return dbObj;
};

/**
 * Отзывы: Маппинг данных
 */
export const mapTestimonialFromDB = (row: any): Testimonial => ({
    ...row,
    mediaUrl: row.media_url || row.mediaUrl || '',
    thumbnailUrl: row.thumbnail_url || row.thumbnailUrl || '',
    createdAt: row.created_at || row.createdAt || new Date().toISOString()
});

export const mapTestimonialToDB = (data: Partial<Testimonial>) => {
    const dbObj: any = { ...data };
    if (data.mediaUrl !== undefined) dbObj.media_url = data.mediaUrl;
    if (data.thumbnailUrl !== undefined) dbObj.thumbnail_url = data.thumbnailUrl;
    delete dbObj.mediaUrl;
    delete dbObj.thumbnailUrl;
    delete dbObj.createdAt;
    return dbObj;
};
