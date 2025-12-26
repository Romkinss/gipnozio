
import React, { useState, useEffect } from 'react';
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ФИКС: Добавлен импорт RefreshCw из lucide-react
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { X, Save, Plus, Trash, HelpCircle, FileText, Database, CheckCircle2, RefreshCw } from 'lucide-react';
import { Quiz, QuizQuestion } from '../../types/index';
import { api } from '../../services/api';

interface QuizEditorProps {
    show: boolean;
    onClose: () => void;
    onSave: () => void;
    item: Partial<Quiz>;
}

const QuizEditor: React.FC<QuizEditorProps> = ({ show, onClose, onSave, item }) => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [importMode, setImportMode] = useState(false);
    const [csvInput, setCsvInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show) {
            setTitle(item.title || '');
            setQuestions(item.data || []);
            setImportMode(false);
            setCsvInput('');
        }
    }, [show, item]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', answers: ['', ''], correctAnswerIndex: 0 }]);
    };

    const handleRemoveQuestion = (idx: number) => {
        setQuestions(questions.filter((_, i) => i !== idx));
    };

    const handleQuestionChange = (idx: number, field: string, value: any) => {
        const newQuestions = [...questions];
        (newQuestions[idx] as any)[field] = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (qIdx: number, aIdx: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[qIdx].answers[aIdx] = value;
        setQuestions(newQuestions);
    };

    const handleAddAnswer = (qIdx: number) => {
        const newQuestions = [...questions];
        newQuestions[qIdx].answers.push('');
        setQuestions(newQuestions);
    };

    const handleRemoveAnswer = (qIdx: number, aIdx: number) => {
        const newQuestions = [...questions];
        newQuestions[qIdx].answers = newQuestions[qIdx].answers.filter((_, i) => i !== aIdx);
        // Correct index if needed
        if (newQuestions[qIdx].correctAnswerIndex >= newQuestions[qIdx].answers.length) {
            newQuestions[qIdx].correctAnswerIndex = 0;
        }
        setQuestions(newQuestions);
    };

    const handleCsvImport = () => {
        const lines = csvInput.split('\n').filter(line => line.trim());
        const newQuestions: QuizQuestion[] = lines.map(line => {
            // Split by semicolon or tab or comma
            const parts = line.split(/[;\t]/).map(p => p.trim()).filter(Boolean);
            if (parts.length < 2) return null;
            
            return {
                question: parts[0],
                answers: parts.slice(1),
                correctAnswerIndex: 0 // In our CSV logic, the first answer after question is always correct
            };
        }).filter(q => q !== null) as QuizQuestion[];

        setQuestions([...questions, ...newQuestions]);
        setImportMode(false);
        setCsvInput('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return alert('Введите название квиза');
        if (questions.length === 0) return alert('Добавьте хотя бы один вопрос');

        setLoading(true);
        try {
            if (item.id) {
                await api.quizzes.update(item.id, title, questions);
            } else {
                await api.quizzes.create(title, questions);
            }
            onSave();
        } catch (e: any) {
            alert('Ошибка при сохранении: ' + e.message);
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-dark/20 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-fade-in-up border border-gray-100">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="bg-dark text-gold p-2 rounded-lg"><HelpCircle size={20} /></div>
                        <div>
                            <h3 className="text-xl font-bold font-serif text-dark">
                                {item.id ? 'Редактировать квиз' : 'Новый квиз'}
                            </h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Конструктор тестов</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-dark p-2 hover:bg-white/50 rounded-full transition-all"><X /></button>
                </div>
                
                <div className="overflow-y-auto p-6 md:p-10 flex-1 bg-white">
                    <form id="quizForm" onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Название теста</label>
                            <input 
                                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:bg-white focus:border-gold outline-none transition-all font-serif text-xl font-bold" 
                                value={title} 
                                onChange={e => setTitle(e.target.value)} 
                                placeholder="Например: Основы гипноза. Тест №1"
                                required 
                            />
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h4 className="text-xs font-bold text-dark uppercase tracking-widest">Вопросы ({questions.length})</h4>
                            <div className="flex gap-2">
                                <button 
                                    type="button" 
                                    onClick={() => setImportMode(!importMode)}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-100 transition-all"
                                >
                                    <Database size={14} /> {importMode ? 'Отмена импорта' : 'Импорт из CSV'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleAddQuestion}
                                    className="flex items-center gap-2 px-4 py-2 bg-dark text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all"
                                >
                                    <Plus size={14} /> Добавить вопрос
                                </button>
                            </div>
                        </div>

                        {importMode ? (
                            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 animate-fade-in-up">
                                <div className="flex items-center gap-3 mb-4 text-indigo-700">
                                    <FileText size={20} />
                                    <h5 className="font-bold text-sm">Вставьте CSV данные</h5>
                                </div>
                                <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">
                                    Формат: <code>Вопрос;Правильный ответ;Неверный 1;Неверный 2...</code><br/>
                                    Каждый новый вопрос с новой строки. Разделитель — точка с запятой (;) или Табуляция.
                                </p>
                                <textarea 
                                    className="w-full h-64 p-4 bg-white border border-indigo-100 rounded-xl font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                                    placeholder="Ваш вопрос;Верный ответ;Ложный 1;Ложный 2"
                                    value={csvInput}
                                    onChange={e => setCsvInput(e.target.value)}
                                ></textarea>
                                <div className="mt-4 flex justify-end">
                                    <button 
                                        type="button"
                                        onClick={handleCsvImport}
                                        className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-lg"
                                    >
                                        Импортировать в список
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {questions.map((q, qIdx) => (
                                    <div key={qIdx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group animate-fade-in-up">
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveQuestion(qIdx)}
                                            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 p-1 transition-colors"
                                        >
                                            <Trash size={16} />
                                        </button>
                                        
                                        <div className="mb-4">
                                            <div className="text-[9px] font-bold text-gold uppercase tracking-[0.2em] mb-2">Вопрос #{qIdx + 1}</div>
                                            <input 
                                                className="w-full bg-white border border-gray-200 p-3 rounded-xl font-bold text-dark outline-none focus:border-gold" 
                                                value={q.question} 
                                                onChange={e => handleQuestionChange(qIdx, 'question', e.target.value)}
                                                placeholder="Введите текст вопроса"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex justify-between items-center">
                                                <span>Варианты ответов</span>
                                                <span>Правильный</span>
                                            </div>
                                            {q.answers.map((ans, aIdx) => (
                                                <div key={aIdx} className="flex items-center gap-3">
                                                    <div className="flex-1 relative">
                                                        <input 
                                                            className={`w-full p-2.5 pl-4 rounded-lg border text-sm outline-none transition-all ${q.correctAnswerIndex === aIdx ? 'bg-green-50 border-green-200 focus:border-green-400' : 'bg-white border-gray-200 focus:border-gold'}`}
                                                            value={ans}
                                                            onChange={e => handleAnswerChange(qIdx, aIdx, e.target.value)}
                                                            placeholder={`Вариант ${aIdx + 1}`}
                                                        />
                                                    </div>
                                                    <input 
                                                        type="radio" 
                                                        name={`correct_${qIdx}`} 
                                                        checked={q.correctAnswerIndex === aIdx}
                                                        onChange={() => handleQuestionChange(qIdx, 'correctAnswerIndex', aIdx)}
                                                        className="w-4 h-4 accent-green-600 cursor-pointer"
                                                    />
                                                    <button 
                                                        type="button" 
                                                        onClick={() => handleRemoveAnswer(qIdx, aIdx)}
                                                        className="text-gray-300 hover:text-red-400 transition-colors"
                                                        disabled={q.answers.length <= 2}
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button 
                                                type="button" 
                                                onClick={() => handleAddAnswer(qIdx)}
                                                className="text-[10px] text-blue-500 font-bold hover:text-blue-700 flex items-center gap-1 mt-2"
                                            >
                                                <Plus size={12} /> Добавить вариант
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </form>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
                    <button type="button" onClick={onClose} className="px-8 py-3 text-gray-500 font-bold hover:text-dark transition-colors">Отмена</button>
                    <button 
                        type="submit" 
                        form="quizForm" 
                        disabled={loading}
                        className="px-10 py-3 bg-dark text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <RefreshCw className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                        {loading ? 'Сохранение...' : 'Сохранить квиз'}
                    </button>
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

export default QuizEditor;
