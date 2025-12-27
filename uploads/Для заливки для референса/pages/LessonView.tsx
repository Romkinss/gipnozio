// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: LessonView.tsx
// Причина: Интеграция Опросов (Surveys) в уроки
// Файл: /src/pages/LessonView.tsx
// Статус: расширен (передача firstName в SurveyView)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Article, UserProfile } from '../types';
import { formatContent } from '../utils/markdownFormatter';
import { ChevronLeft, CheckCircle, Lock, Download, FileText, Save } from 'lucide-react';
import QuizView from '../components/QuizView';
import SurveyView from '../components/SurveyView';
import SEO from '../components/SEO';
import DOMPurify from 'dompurify';

const LessonView: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState<Article | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    
    const [noteContent, setNoteContent] = useState('');
    const [noteSaving, setNoteSaving] = useState(false);
    const [noteSaved, setNoteSaved] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('student_user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (slug) {
            api.articles.get(slug).then(async (data) => {
                if (data && (data.access_level || 1) > parsedUser.role_level) {
                    alert('Доступ запрещен. Требуется более высокий уровень.');
                    navigate('/learning');
                    return;
                }
                setLesson(data || null);
                
                if (data) {
                    try {
                        const note = await api.learning.getNote(parsedUser.telegram_id, data.id);
                        if (note) setNoteContent(note.content);
                    } catch (e) {
                        console.error("Failed to load notes", e);
                    }
                }
                
                setLoading(false);
            });
        }
    }, [slug, navigate]);

    useEffect(() => {
        if (!loading && lesson) {
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                iframe.removeAttribute('width');
                iframe.removeAttribute('height');
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
            });
        }
    }, [loading, lesson]);

    const handleComplete = async () => {
        if (user && lesson) {
            await api.learning.markCompleted(user.telegram_id, lesson.id);
            navigate('/learning');
        }
    };

    const handleSaveNote = useCallback(async () => {
        if (!user || !lesson) return;
        setNoteSaving(true);
        try {
            await api.learning.saveNote(user.telegram_id, lesson.id, noteContent);
            setNoteSaved(true);
            setTimeout(() => setNoteSaved(false), 2000);
        } catch (e) {
            console.error('Save failed', e);
            alert('Ошибка сохранения заметки');
        } finally {
            setNoteSaving(false);
        }
    }, [user, lesson, noteContent]);

    const contentParts = useMemo(() => {
        if (!lesson?.content) return [];
        const parts: { type: 'text' | 'quiz' | 'survey', content: string }[] = [];
        
        const regex = /\[(quiz|survey):([a-zA-Z0-9-]+)\]/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(lesson.content)) !== null) {
            if (match.index > lastIndex) {
                const rawHtml = formatContent(lesson.content.substring(lastIndex, match.index));
                const cleanHtml = DOMPurify.sanitize(rawHtml, {
                    ADD_TAGS: ['iframe'],
                    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'style']
                });
                parts.push({ type: 'text', content: cleanHtml });
            }
            
            parts.push({ 
                type: match[1] as 'quiz' | 'survey', 
                content: match[2] 
            });
            
            lastIndex = regex.lastIndex;
        }

        if (lastIndex < lesson.content.length) {
             const rawHtml = formatContent(lesson.content.substring(lastIndex));
             const cleanHtml = DOMPurify.sanitize(rawHtml, {
                ADD_TAGS: ['iframe'],
                ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'style']
            });
            parts.push({ type: 'text', content: cleanHtml });
        }

        return parts;
    }, [lesson?.content]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div></div>;
    if (!lesson) return <div>Урок не найден</div>;

    return (
        <div className="min-h-screen bg-white">
            <SEO title={lesson.title} noindex={true} />
            
            <header className="bg-dark text-white p-3 md:p-4 sticky top-0 z-30 shadow-lg">
                <div className="container mx-auto max-w-5xl flex items-center justify-between">
                    <Link to="/learning" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                        <ChevronLeft size={20} /> <span className="hidden sm:inline">Назад к курсу</span><span className="sm:hidden">Назад</span>
                    </Link>
                    <div className="font-serif font-bold truncate max-w-[180px] sm:max-w-md text-sm md:text-base">{lesson.title}</div>
                    <div className="w-8"></div>
                </div>
            </header>

            <div className="container mx-auto max-w-5xl p-0 sm:p-4 md:p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 min-w-0 w-full overflow-hidden">
                        <div className="bg-white rounded-none sm:rounded-2xl shadow-none sm:shadow-sm border-0 sm:border border-gray-100 p-5 sm:p-8">
                            <h1 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-dark">{lesson.title}</h1>
                            
                            <div className="w-full overflow-hidden">
                                {contentParts.map((part, idx) => {
                                    if (part.type === 'text') {
                                        return <div key={idx} className="article-content" dangerouslySetInnerHTML={{ __html: part.content }} />;
                                    } else if (part.type === 'quiz' && user) {
                                        return <QuizView key={idx} quizId={part.content} telegramId={user.telegram_id} />;
                                    } else if (part.type === 'survey' && user) {
                                        return <SurveyView key={idx} surveyId={part.content} telegramId={user.telegram_id} firstName={user.first_name} lessonId={lesson.id} />;
                                    }
                                    return null;
                                })}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center pb-12 sm:pb-0">
                            <button 
                                onClick={handleComplete}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 md:px-12 rounded-xl shadow-lg shadow-green-200 transform hover:scale-105 transition-all flex items-center gap-2 text-sm md:text-base"
                            >
                                <CheckCircle size={20} /> Завершить урок
                            </button>
                        </div>
                    </div>

                    <div className="hidden lg:block w-80 shrink-0">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h4 className="font-bold text-gray-500 uppercase text-xs mb-4">Материалы урока</h4>
                                {lesson.attachments && lesson.attachments.length > 0 ? (
                                    <div className="space-y-3">
                                        {lesson.attachments.map((file, idx) => (
                                            <a key={idx} href={file.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gold hover:shadow-sm transition-all group">
                                                <div className="bg-blue-50 text-blue-500 p-2 rounded-lg group-hover:bg-gold/10 group-hover:text-gold transition-colors"><FileText size={18} /></div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-bold text-dark truncate group-hover:text-gold-dark transition-colors">{file.name}</div>
                                                    <div className="text-xs text-gray-400">{file.size}</div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                ) : <p className="text-sm text-gray-400 italic">Нет файлов</p>}
                            </div>
                            
                            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-bold text-gray-500 uppercase text-xs">Личные заметки</h4>
                                    {noteSaved && <span className="text-xs text-green-600 font-bold animate-pulse">Сохранено</span>}
                                </div>
                                <textarea className="w-full h-40 p-3 text-sm border border-gray-200 rounded-lg focus:border-gold outline-none bg-gray-50 focus:bg-white transition-all" placeholder="Ваши инсайты..." value={noteContent} onChange={(e) => setNoteContent(e.target.value)} onBlur={handleSaveNote}></textarea>
                                <button onClick={handleSaveNote} disabled={noteSaving} className="w-full mt-3 py-2 bg-dark text-white rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                                    {noteSaving ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> : <Save size={14} />} Сохранить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonView;