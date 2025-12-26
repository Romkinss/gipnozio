// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: SurveyView.tsx (GRP-12-STABLE)
// Причина: Гарантированное отображение названия опроса
// Файл: /src/components/SurveyView.tsx
// Статус: подтверждено
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useEffect, useRef } from 'react';
import { Survey } from '../types/index';
import { api } from '../services/api';
import { CheckCircle, Loader2, BarChart3, ChevronLeft, ArrowRight } from 'lucide-react';

interface SurveyViewProps {
  surveyId: string;
  telegramId: number;
  firstName: string;
  lessonId: string;
}

const SurveyView: React.FC<SurveyViewProps> = ({ surveyId, telegramId, firstName, lessonId }) => {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const [tempScore, setTempScore] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isWaitingToAdvance, setIsWaitingToAdvance] = useState(false);
  
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const [data, result] = await Promise.all([
          api.surveys.get(surveyId),
          api.surveys.getResult(telegramId, surveyId, lessonId)
        ]);
        if (data) {
          setSurvey(data);
          if (result && result.responses) {
            setResponses(result.responses);
            setIsFinished(true);
          }
        }
      } catch (e) { console.error('Survey Load Error:', e); }
      finally { setLoading(false); }
    };
    init();
  }, [surveyId, telegramId, lessonId]);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const handleFinalSave = async (currentResponses: Record<string, number>) => {
    setSaving(true);
    try {
      await api.surveys.saveResult(telegramId, surveyId, lessonId, currentResponses);
      
      const reportText = `📊 <b>ОТЧЕТ: ${survey?.title}</b>\n\n` +
                         `👤 <b>Студент:</b> ${firstName}\n` +
                         `━━━━━━━━━━━━━━━━\n\n` +
                         (survey?.statements.map((s, i) => {
                            const score = currentResponses[s.id] || 0;
                            const emoji = score >= 8 ? '🔴' : score >= 5 ? '🟡' : '🟢';
                            return `${i+1}. ${s.text}\n${emoji} Результат: <b>${score}/10</b>`;
                         }).join('\n\n') || '');
      
      const TELEGRAM_BOT_TOKEN = '8342145689:AAEPvUoWqV4LnK9Ll4LvNeWOghD7kEfRjNE';
      const TELEGRAM_CHAT_ID = '364714907';

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: reportText, parse_mode: 'HTML' })
      });
      setIsFinished(true);
    } catch (e) { alert('Ошибка сохранения'); }
    finally { setSaving(false); }
  };

  const moveToNext = () => {
    setIsWaitingToAdvance(false);
    if (!survey) return;
    if (currentIndex < survey.statements.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTempScore(0);
    } else {
      handleFinalSave(responses);
    }
  };

  const startAdvanceTimer = () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    setIsWaitingToAdvance(true);
    advanceTimerRef.current = setTimeout(() => {
      moveToNext();
    }, 2000);
  };

  const handlePointerAction = (e: React.PointerEvent) => {
    if (isFinished || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    let score = Math.ceil((x / width) * 10);
    score = Math.max(1, Math.min(10, score));
    
    setTempScore(score);
    
    const currentId = survey?.statements[currentIndex].id;
    if (currentId) {
      setResponses(prev => ({ ...prev, [currentId]: score }));
    }

    if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
        setIsWaitingToAdvance(false);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handlePointerAction(e);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (isDragging) handlePointerAction(e);
  };

  const onPointerUp = () => {
    setIsDragging(false);
    if (tempScore > 0) startAdvanceTimer();
  };

  if (loading) return <div className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">Синхронизация данных...</div>;
  if (!survey) return null;

  const currentStatement = survey.statements[currentIndex];
  const progressPercent = ((currentIndex + 1) / survey.statements.length) * 100;

  const getIntensityColor = (score: number) => {
    const lightness = 95 - (score * 5);
    const saturation = 50 + (score * 4);
    return `hsl(217, ${saturation}%, ${lightness}%)`;
  };

  if (isFinished) {
    return (
        <div className="my-6 md:my-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden animate-fade-in-up max-w-4xl mx-auto">
            <div className="bg-dark p-8 md:p-12 text-center relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100 shadow-inner">
                    <CheckCircle className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">Диагностика завершена</h3>
                <p className="text-gold text-xs font-bold uppercase tracking-[0.2em]">Ваше состояние зафиксировано</p>
            </div>
            <div className="p-6 md:p-12">
                <div className="space-y-3 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {survey.statements.map((s, i) => (
                        <div key={s.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="text-xs md:text-sm text-gray-600 font-medium pr-4">{i+1}. {s.text}</p>
                            <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-serif font-bold text-dark border border-gray-200 shadow-sm">{responses[s.id]}</span>
                        </div>
                    ))}
                </div>
                <div className="text-center italic text-gray-400 text-sm">«Мастер изучит результаты перед следующей сессией».</div>
            </div>
        </div>
    );
  }

  return (
    <div className="my-4 md:my-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden animate-fade-in-up relative max-w-4xl mx-auto">
      
      <div className="h-1 w-full bg-gray-50 absolute top-0 left-0">
          <div className="h-full bg-gold transition-all duration-700 ease-out" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <div className="p-6 md:p-10">
        <div className="flex justify-between items-center mb-6 md:mb-10">
            <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold text-gold uppercase tracking-widest">
                Шаг {currentIndex + 1} / {survey.statements.length}
            </span>
            <div className="text-[9px] font-bold text-gray-300 uppercase tracking-widest truncate max-w-[160px] md:max-w-none text-right">
                {survey.title}
            </div>
        </div>

        <div className="min-h-[120px] md:min-h-[160px] flex items-center justify-center text-center mb-8 px-4">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-dark leading-tight animate-fade-in-up" key={currentIndex}>
                «{currentStatement.text}»
            </h2>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
            <div className="mb-4 flex justify-between px-1">
                <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Минимум</span>
                <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Максимум</span>
            </div>
            
            <div 
                ref={containerRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                className={`relative h-32 md:h-44 bg-white border border-gray-100 rounded-3xl p-4 md:p-6 flex items-end justify-between gap-1.5 md:gap-3 cursor-pointer touch-none transition-all duration-300 ${isDragging ? 'border-indigo-200 shadow-inner' : ''}`}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                    const isActive = num <= tempScore;
                    const activeColor = getIntensityColor(tempScore);
                    
                    return (
                        <div 
                            key={num}
                            className={`flex-1 rounded-md md:rounded-xl transition-all duration-300 relative ${isWaitingToAdvance && isActive ? 'animate-pulse scale-y-105' : ''}`}
                            style={{ 
                                height: `${20 + (num * 8)}%`,
                                backgroundColor: isActive ? activeColor : '#F9FAFB',
                                border: isActive ? `1px solid ${activeColor}` : '1px solid #F3F4F6',
                                boxShadow: isActive ? `0 0 15px -5px ${activeColor}` : 'none'
                            }}
                        >
                            {isActive && num === tempScore && (
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-indigo-600 text-sm md:text-lg animate-fade-in-up">
                                    {num}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-4 h-1 flex justify-center">
                {isWaitingToAdvance && (
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce"></div>
                        <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                )}
            </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
            <button 
                onClick={() => {
                    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
                    setIsWaitingToAdvance(false);
                    setCurrentIndex(prev => prev - 1);
                }}
                disabled={currentIndex === 0 || saving}
                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-dark'}`}
            >
                <ChevronLeft size={16} /> Назад
            </button>

            <button 
                onClick={() => {
                    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
                    moveToNext();
                }}
                disabled={saving || tempScore === 0}
                className={`flex items-center gap-3 bg-dark hover:bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-30 group`}
            >
                {currentIndex === survey.statements.length - 1 ? 'Завершить' : 'Далее'}
                {saving ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
            </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyView;