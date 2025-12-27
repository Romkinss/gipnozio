// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: QuizView.tsx
// Причина: передача финального процента в API при завершении
// Файл: /src/components/QuizView.tsx
// Статус: изменяется
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useEffect } from 'react';
import { Quiz, QuizQuestion } from '../types';
import { api } from '../services/api';
import { Check, X, RefreshCcw } from 'lucide-react';

interface QuizViewProps {
  quizId: string;
  telegramId: number;
}

interface QuestionState {
  originalIndex: number;
  question: string;
  answers: { text: string; originalIndex: number }[];
}

const COMMENTS = {
  wrong: [
    "Не волнуйтесь, вы все еще учитесь!",
    "Ошибки помогают запоминать лучше.",
    "Почти угадали, попробуем дальше!",
    "Ничего страшного, знания приходят с опытом.",
    "Хорошая попытка! Попробуйте еще раз."
  ],
  correct: [
    "Верный ответ!",
    "Отлично!",
    "Так держать!",
    "В точку!",
    "Превосходно!"
  ]
};

const QuizView: React.FC<QuizViewProps> = ({ quizId, telegramId }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // UI States for current question
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null); 
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [shake, setShake] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  const shuffleArray = (array: any[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const loadQuiz = async () => {
    setLoading(true);
    try {
      const data = await api.quizzes.get(quizId);
      if (!data) throw new Error('Quiz not found');
      
      setQuiz(data);
      
      const preparedQuestions = data.data.map((q, idx) => {
        const answersWithIndices = q.answers.map((ans, aIdx) => ({ text: ans, originalIndex: aIdx }));
        return {
          originalIndex: idx,
          question: q.question,
          answers: shuffleArray(answersWithIndices)
        };
      });
      
      setQuestions(shuffleArray(preparedQuestions));
      setLoading(false);
    } catch (e: any) {
      setError('Не удалось загрузить тест');
      setLoading(false);
    }
  };

  const handleAnswer = (answerIdx: number) => {
    if (isAnswered) return;

    setSelectedAnswerIndex(answerIdx);
    setIsAnswered(true);

    const currentQ = questions[currentQIndex];
    const originalQ = quiz?.data.find(q => q.question === currentQ.question);
    
    if (!originalQ) return;

    const selectedOriginalIndex = currentQ.answers[answerIdx].originalIndex;
    const actuallyCorrect = selectedOriginalIndex === 0;

    setIsCorrect(actuallyCorrect);

    if (actuallyCorrect) {
      setScore(s => s + 1);
      setFeedbackMsg(COMMENTS.correct[Math.floor(Math.random() * COMMENTS.correct.length)]);
      
      setTimeout(() => {
        handleNext();
      }, 1500);
    } else {
      setShake(true);
      setFeedbackMsg(COMMENTS.wrong[Math.floor(Math.random() * COMMENTS.wrong.length)]);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      resetQuestionState();
    } else {
      finishQuiz();
    }
  };

  const resetQuestionState = () => {
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedbackMsg('');
  };

  const finishQuiz = async () => {
    setIsFinished(true);
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ✅ ФИКСАЦИЯ РЕЗУЛЬТАТА: Передача % в базу
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const finalPercent = Math.round((score / questions.length) * 100);
    await api.quizzes.saveResult(telegramId, quizId, finalPercent);
  };

  const restart = () => {
    setQuestions(shuffleArray([...questions])); 
    setCurrentQIndex(0);
    setScore(0);
    setIsFinished(false);
    resetQuestionState();
  };

  if (loading) return <div className="p-8 text-center"><div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gold border-t-transparent"></div></div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!quiz) return null;

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";
    let color = "text-red-500";
    if (percentage >= 95) { message = "Превосходно!"; color = "text-emerald-500"; }
    else if (percentage >= 75) { message = "Хороший результат!"; color = "text-blue-500"; }
    else if (percentage >= 50) { message = "Неплохо, но можно лучше."; color = "text-orange-500"; }
    else { message = "Стоит повторить материал."; color = "text-red-500"; }

    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center max-w-2xl mx-auto my-8 animate-fade-in-up">
        <h3 className="text-xl font-serif font-bold text-dark mb-2">Результаты теста</h3>
        <div className={`text-5xl font-bold mb-4 ${color}`}>{percentage}%</div>
        <p className="text-lg text-gray-600 mb-6">{message}</p>
        <p className="text-gray-400 mb-8 text-sm">Вы ответили верно на {score} из {questions.length} вопросов.</p>
        <button 
          onClick={restart}
          className="bg-gold hover:bg-gold-dark text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-gold flex items-center gap-2 mx-auto text-sm"
        >
          <RefreshCcw size={18} /> Пройти заново
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQIndex];

  return (
    <div className="max-w-3xl mx-auto my-6 md:my-12">
      <div className="bg-dark rounded-t-2xl p-4 md:p-6 flex justify-between items-center text-white">
        <span className="font-bold tracking-wider uppercase text-[10px] md:text-xs text-gold">Вопрос {currentQIndex + 1} / {questions.length}</span>
        <span className="text-[9px] md:text-xs text-gray-400 truncate max-w-[120px] md:max-w-none">Тест: {quiz.title}</span>
      </div>
      
      <div className="bg-white rounded-b-2xl shadow-2xl border border-gray-100 p-5 md:p-10">
        <h3 className="text-lg md:text-2xl font-bold text-dark mb-6 md:mb-8 leading-relaxed">
          {currentQ.question}
        </h3>

        <div className="space-y-2.5 md:space-y-4">
          {currentQ.answers.map((ans, idx) => {
            let btnClass = "bg-white border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 text-gray-700";
            
            if (isAnswered) {
              if (idx === selectedAnswerIndex) {
                if (ans.originalIndex === 0) {
                   btnClass = "bg-green-100 border-green-500 text-green-800"; 
                } else {
                   btnClass = "bg-red-100 border-red-500 text-red-800"; 
                }
              } else if (ans.originalIndex === 0) {
                btnClass = "bg-green-50 border-green-300 text-green-700 opacity-70"; 
              } else {
                btnClass = "opacity-50 border-gray-100"; 
              }
            }

            if (shake && idx === selectedAnswerIndex) {
               btnClass += " animate-[shake_0.5s_ease-in-out]";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                className={`w-full p-3.5 md:p-5 rounded-xl text-left font-medium transition-all duration-300 flex items-center justify-between group text-sm md:text-base ${btnClass}`}
              >
                <span>{ans.text}</span>
                {isAnswered && idx === selectedAnswerIndex && (
                   ans.originalIndex === 0 ? <Check size={18} className="text-green-600 shrink-0 ml-2" /> : <X size={18} className="text-red-600 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        <div className={`mt-6 md:mt-8 min-h-[50px] transition-all duration-300 ${isAnswered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {isAnswered && (
            <div className={`flex items-center justify-between p-3 md:p-4 rounded-lg ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-blue-50 text-blue-800'}`}>
               <div className="flex items-center gap-2 md:gap-3">
                 <span className="text-xl md:text-2xl">{isCorrect ? '🎉' : '💪'}</span>
                 <span className="font-bold text-xs md:text-base">{feedbackMsg}</span>
               </div>
               {!isCorrect && (
                 <button onClick={handleNext} className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg text-xs md:text-sm font-bold hover:bg-blue-700 transition-colors">
                   Далее
                 </button>
               )}
            </div>
          )}
        </div>

      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default QuizView;