import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Zap, BookOpen, CheckCircle, Play } from 'lucide-react';

interface LessonViewProps {
  title: string;
  description: string;
  duration: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  module?: string;
  objectives?: string[];
  content: string;
  videoUrl?: string;
  resources?: Array<{
    title: string;
    url: string;
    type?: 'video' | 'pdf' | 'link' | 'exercise';
  }>;
  previousLesson?: {
    slug: string;
    title: string;
  };
  nextLesson?: {
    slug: string;
    title: string;
  };
  progress?: number;
}

const getLevelColor = (level?: string) => {
  switch (level) {
    case 'beginner':
      return 'bg-green-100 text-green-800';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getLevelLabel = (level?: string) => {
  switch (level) {
    case 'beginner':
      return 'Начинающий';
    case 'intermediate':
      return 'Средний уровень';
    case 'advanced':
      return 'Продвинутый';
    default:
      return 'Все уровни';
  }
};

export default function LessonView({
  title,
  description,
  duration,
  level,
  module,
  objectives,
  content,
  videoUrl,
  resources,
  previousLesson,
  nextLesson,
  progress = 0,
}: LessonViewProps) {
  const [showTableOfContents, setShowTableOfContents] = useState(true);

  return (
    <article className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        {module && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium">
              {module}
            </span>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
          {title}
        </h1>

        <p className="text-xl text-gray-600 mb-6">{description}</p>

        {/* Meta information */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={18} />
            <span>{duration}</span>
          </div>
          {level && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(level)}`}>
              <Zap size={16} />
              <span>{getLevelLabel(level)}</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Прогресс</span>
              <span className="text-sm font-medium text-gold">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gold h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </header>

      {/* Divider */}
      <div className="border-t border-gray-200 my-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Video section */}
          {videoUrl && (
            <div className="mb-12">
              <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={videoUrl}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Objectives */}
          {objectives && objectives.length > 0 && (
            <div className="mb-12 bg-blue-50 rounded-lg p-6">
              <h2 className="text-2xl font-serif font-bold text-dark mb-4 flex items-center gap-2">
                <CheckCircle className="text-blue-600" size={24} />
                Цели урока
              </h2>
              <ul className="space-y-2">
                {objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>

          {/* Resources */}
          {resources && resources.length > 0 && (
            <div className="mb-12 bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-serif font-bold text-dark mb-4 flex items-center gap-2">
                <BookOpen size={24} />
                Ресурсы
              </h2>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gold/5 transition border border-gray-200 hover:border-gold"
                  >
                    {resource.type === 'video' && <Play size={18} className="text-gold" />}
                    {resource.type === 'pdf' && <BookOpen size={18} className="text-gold" />}
                    {!resource.type && <BookOpen size={18} className="text-gold" />}
                    <div className="flex-1">
                      <div className="font-medium text-dark">{resource.title}</div>
                      {resource.type && (
                        <div className="text-xs text-gray-500 capitalize">{resource.type}</div>
                      )}
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Table of Contents */}
          <div className="sticky top-24 bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-serif font-bold text-dark mb-4">Содержание</h3>
            <div className="space-y-2 text-sm">
              {objectives && objectives.length > 0 && (
                <a href="#objectives" className="block text-gray-600 hover:text-gold transition">
                  Цели урока
                </a>
              )}
              {content && (
                <a href="#content" className="block text-gray-600 hover:text-gold transition">
                  Основной материал
                </a>
              )}
              {resources && resources.length > 0 && (
                <a href="#resources" className="block text-gray-600 hover:text-gold transition">
                  Ресурсы
                </a>
              )}
            </div>
          </div>

          {/* Lesson info */}
          <div className="bg-dark text-white rounded-lg p-6">
            <h3 className="font-serif font-bold mb-4">Информация об уроке</h3>
            <div className="space-y-4 text-sm">
              <div>
                <div className="text-gray-400 mb-1">Продолжительность</div>
                <div className="font-medium">{duration}</div>
              </div>
              {level && (
                <div>
                  <div className="text-gray-400 mb-1">Уровень</div>
                  <div className="font-medium">{getLevelLabel(level)}</div>
                </div>
              )}
              {module && (
                <div>
                  <div className="text-gray-400 mb-1">Модуль</div>
                  <div className="font-medium">{module}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-12"></div>

      {/* Navigation */}
      <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {previousLesson ? (
          <a
            href={`/lessons/${previousLesson.slug}`}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-gold hover:bg-gold/5 transition group"
          >
            <ChevronLeft className="text-gold group-hover:translate-x-[-4px] transition" size={20} />
            <div className="text-left">
              <div className="text-sm text-gray-600">Предыдущий урок</div>
              <div className="font-semibold text-dark group-hover:text-gold transition">
                {previousLesson.title}
              </div>
            </div>
          </a>
        ) : (
          <div></div>
        )}

        {nextLesson ? (
          <a
            href={`/lessons/${nextLesson.slug}`}
            className="flex items-center justify-end gap-3 p-4 border border-gray-200 rounded-lg hover:border-gold hover:bg-gold/5 transition group md:col-start-2"
          >
            <div className="text-right">
              <div className="text-sm text-gray-600">Следующий урок</div>
              <div className="font-semibold text-dark group-hover:text-gold transition">
                {nextLesson.title}
              </div>
            </div>
            <ChevronRight className="text-gold group-hover:translate-x-1 transition" size={20} />
          </a>
        ) : (
          <div></div>
        )}
      </nav>

      {/* Back to lessons */}
      <div className="mt-12 text-center">
        <a
          href="/lessons"
          className="inline-block px-6 py-3 bg-dark text-white hover:bg-gold hover:text-dark transition rounded-lg font-semibold"
        >
          ← Вернуться к урокам
        </a>
      </div>
    </article>
  );
}
