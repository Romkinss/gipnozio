// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: LearningDashboard.tsx
// Причина: обновление визуальных порогов оценок для тестов
// Файл: /pages/LearningDashboard.tsx
// Статус: изменяется
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useEffect, useState } from 'react';
import { useState, useEffect } from 'react';
import { useLMSData } from '../../hooks/useLMSData';
import { UserProfile, Article } from '../../types/index';
import { 
    Lock, PlayCircle, CheckCircle, ChevronDown, LogOut, Star, 
    AlertCircle, Award, Video, FileText, Paperclip, HelpCircle, 
    ArrowRight, RefreshCw, AlignLeft, Users 
} from 'lucide-react';

const LearningDashboard: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [activeModule, setActiveModule] = useState<number | null>(1);

    useEffect(() => {
        const storedUser = localStorage.getItem('student_user');
        if (!storedUser) {
            window.location.href = '/login';
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    const { modules, progress, quizResults, nextLesson, loading } = useLMSData(user);

    const handleLogout = () => {
        localStorage.removeItem('student_user');
        window.location.href = '/';
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ⚠️ ЗАЩИЩЁННАЯ ЗОНА: getInitials
    // Статус: сохранено без изменений
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const getInitials = (name: string) => {
        if (!name) return '?';
        const parts = name.split(' ').filter(Boolean);
        if (parts.length === 0) return '?';
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ✅ ОБНОВЛЕННАЯ ЛОГИКА: getQuizBadge
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const getQuizBadge = (lessonContent: string) => {
        const match = lessonContent.match(/\[quiz:([a-zA-Z0-9-]+)\]/);
        if (!match) return null;
        
        const quizId = match[1];
        const result = quizResults.find(r => r.quiz_id === quizId);
        if (!result) return null;

        // Пороги: 95-100 (Green), 75-94 (Blue), 50-74 (Orange), <50 (Gray)
        let color = "bg-gray-100 text-gray-500";
        if (result.score >= 95) color = "bg-green-100 text-green-700";
        else if (result.score >= 75) color = "bg-blue-100 text-blue-700";
        else if (result.score >= 50) color = "bg-orange-100 text-orange-700";

        return (
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${color} border border-current/20 shrink-0 ml-1`}>
                <Star size={10} /> {result.score}%
            </div>
        );
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ⚠️ ЗАЩИЩЁННАЯ ЗОНА: getContentBadges
    // Статус: сохранено без изменений
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const getContentBadges = (tagsStr?: string) => {
        if (!tagsStr) return <div className="text-xs text-gray-400 mt-0.5">10 мин</div>;
        
        const tags = tagsStr.split(',').map(t => t.trim());
        
        const getTagConfig = (tag: string) => {
            const t = tag.toLowerCase();
            if (t === 'видео') return { 
                color: "bg-blue-50 text-blue-600 border-blue-100", 
                icon: <Video size={10} /> 
            };
            if (t === 'конспект') return { 
                color: "bg-emerald-50 text-emerald-600 border-emerald-100", 
                icon: <FileText size={10} /> 
            };
            if (t === 'текст') return { 
                color: "bg-slate-100 text-slate-600 border-slate-200", 
                icon: <AlignLeft size={10} /> 
            };
            if (t === 'вебинар') return { 
                color: "bg-indigo-50 text-indigo-600 border-indigo-100", 
                icon: <Users size={10} /> 
            };
            if (t === 'экзамен' || t === 'тест') return { 
                color: "bg-gold/15 text-gold-dark border-gold/20", 
                icon: <Award size={10} /> 
            };
            
            return { 
                color: "bg-gray-50 text-gray-500 border-gray-100", 
                icon: <FileText size={10} /> 
            };
        };

        return (
            <div className="flex flex-wrap gap-2 mt-1.5">
                {tags.map((tag, i) => {
                    const config = getTagConfig(tag);
                    return (
                        <span key={i} className={`flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border transition-colors ${config.color}`}>
                            {config.icon} {tag}
                        </span>
                    );
                })}
            </div>
        );
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                    <a href="/" className="font-serif font-bold text-xl text-dark">GIPNOZIO <span className="text-gold">LMS</span></a>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 text-right">
                            <div className="hidden md:block">
                                <div className="font-bold text-sm text-dark">{user.first_name}</div>
                                <div className="text-xs text-gold font-bold uppercase">Уровень {user.role_level}</div>
                            </div>
                            
                            {user.avatar_url && !user.avatar_url.includes('placeholder') ? (
                                <img src={user.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-gold-dark flex items-center justify-center text-white font-serif font-bold text-sm shadow-inner border border-gold/30">
                                    {getInitials(user.first_name)}
                                </div>
                            )}
                            
                        </div>
                        <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><LogOut size={20} /></button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                        <RefreshCw size={48} className="animate-spin mb-4 text-gold" />
                        <p className="font-bold tracking-widest uppercase text-xs">Загрузка данных...</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h1 className="text-3xl font-serif font-bold text-dark mb-2">Моё обучение</h1>
                            <p className="text-gray-500">Продолжайте путь к мастерству.</p>
                        </div>

                        {nextLesson && (
                             <div className="bg-dark text-white rounded-xl p-6 mb-8 border border-gold/30 shadow-lg relative overflow-hidden">
                                 <div className="relative z-10">
                                    <div className="text-gold font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                                        <PlayCircle size={14} /> Продолжить обучение
                                    </div>
                                    <h2 className="text-2xl font-serif font-bold mb-1">{nextLesson.title}</h2>
                                    <p className="text-gray-400 text-sm mb-6">Модуль {nextLesson.module_number} • Урок {nextLesson.lesson_order}</p>
                                    <button 
                                        onClick={() => window.location.href = `/learning/lesson/${nextLesson.slug}`}
                                        className="bg-gold hover:bg-white hover:text-dark text-dark font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-gold/20"
                                    >
                                        Перейти к уроку <ArrowRight size={18} />
                                    </button>
                                 </div>
                             </div>
                        )}

                        <div className="space-y-4">
                            {Object.keys(modules).sort((a,b) => Number(a)-Number(b)).map(modKey => {
                                const modNum = Number(modKey);
                                const modLessons = modules[modNum];
                                const completedCount = modLessons.filter(l => progress.includes(l.id)).length;
                                const isOpen = activeModule === modNum;

                                return (
                                    <div key={modNum} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                        <button 
                                            onClick={() => setActiveModule(isOpen ? null : modNum)}
                                            className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <div>
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Модуль {modNum}</div>
                                                <h3 className="text-xl font-bold text-dark">Модуль {modNum}</h3>
                                                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-green-50" style={{ width: `${(completedCount / modLessons.length) * 100}%` }}>
                                                            <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
                                                        </div>
                                                    </div>
                                                    <span>{completedCount}/{modLessons.length} пройдено</span>
                                                </div>
                                            </div>
                                            <ChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isOpen && (
                                            <div className="border-t border-gray-100 divide-y divide-gray-100">
                                                {modLessons.map(lesson => {
                                                    const isLocked = (lesson.access_level || 1) > user.role_level;
                                                    const isCompleted = progress.includes(lesson.id);
                                                    return (
                                                        <div key={lesson.id} className={`p-4 pl-6 flex items-center gap-4 ${isLocked ? 'bg-gray-50 opacity-60' : 'hover:bg-blue-50/30 cursor-pointer'}`}
                                                            onClick={() => !isLocked && window.location.href = `/learning/lesson/${lesson.slug}`}
                                                        >
                                                            <div className="shrink-0">
                                                                {isLocked ? <Lock className="text-gray-400" size={18} /> : isCompleted ? <CheckCircle className="text-green-500" size={18} /> : <PlayCircle className="text-blue-500" size={18} />}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-medium text-dark flex items-center gap-2 text-sm md:text-base">
                                                                    <span className="truncate">{lesson.title}</span> 
                                                                    {getQuizBadge(lesson.content)}
                                                                </div>
                                                                {getContentBadges(lesson.tags)}
                                                            </div>
                                                            {!isLocked && (
                                                                <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest px-3 py-1 rounded-full border border-blue-100">
                                                                    {isCompleted ? 'Повторить' : 'Начать'}
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default LearningDashboard;