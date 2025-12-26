// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: SurveyEditor.tsx
// Причина: Добавление импорта CSV (один столбец, пропуск заголовка)
// Файл: /src/components/admin/SurveyEditor.tsx
// Статус: расширен
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash, BarChart3, CheckCircle2, RefreshCw, FileText, Database } from 'lucide-react';
import { Survey, SurveyStatement } from '../../types/index';
import { api } from '../../services/api';

interface SurveyEditorProps {
    show: boolean;
    onClose: () => void;
    onSave: () => void;
    item: Partial<Survey>;
}

const SurveyEditor: React.FC<SurveyEditorProps> = ({ show, onClose, onSave, item }) => {
    const [title, setTitle] = useState('');
    const [statements, setStatements] = useState<SurveyStatement[]>([]);
    const [loading, setLoading] = useState(false);
    
    // Состояния для импорта
    const [importMode, setImportMode] = useState(false);
    const [csvInput, setCsvInput] = useState('');

    useEffect(() => {
        if (show) {
            setTitle(item.title || '');
            setStatements(item.statements || []);
            setImportMode(false);
            setCsvInput('');
        }
    }, [show, item]);

    const handleAddStatement = () => {
        setStatements([...statements, { id: crypto.randomUUID(), text: '' }]);
    };

    const handleRemoveStatement = (idx: number) => {
        setStatements(statements.filter((_, i) => i !== idx));
    };

    const handleTextChange = (idx: number, text: string) => {
        const newArr = [...statements];
        newArr[idx].text = text;
        setStatements(newArr);
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ✅ ЛОГИКА ИМПОРТА CSV
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const handleCsvImport = () => {
        const lines = csvInput.split('\n').filter(line => line.trim());
        if (lines.length <= 1) return alert('Файл пуст или содержит только заголовок');

        // Пропускаем первую строку (header) согласно ТЗ
        const dataLines = lines.slice(1);
        
        const newStatements: SurveyStatement[] = dataLines.map(line => ({
            id: crypto.randomUUID(),
            text: line.trim()
        }));

        setStatements([...statements, ...newStatements]);
        setImportMode(false);
        setCsvInput('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return alert('Введите название');
        if (statements.length === 0) return alert('Добавьте утверждения');

        setLoading(true);
        try {
            if (item.id) {
                await api.surveys.update(item.id, title, statements);
            } else {
                await api.surveys.create(title, statements);
            }
            onSave();
        } catch (e: any) { alert(e.message); }
        finally { setLoading(false); }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-dark/20 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-fade-in-up">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-indigo-50">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 text-white p-2 rounded-lg"><BarChart3 size={20} /></div>
                        <h3 className="text-xl font-bold font-serif text-dark">Редактор диагностики</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-dark p-2 rounded-full transition-all"><X /></button>
                </div>
                
                <div className="overflow-y-auto p-8 flex-1 bg-white">
                    <form id="surveyForm" onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Название диагностики</label>
                            <input className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-serif text-xl font-bold" value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h4 className="text-xs font-bold text-dark uppercase tracking-widest">Список утверждений ({statements.length})</h4>
                            <div className="flex gap-2">
                                <button 
                                    type="button" 
                                    onClick={() => setImportMode(!importMode)}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-100 transition-all"
                                >
                                    <Database size={14} /> {importMode ? 'Отмена импорта' : 'Импорт из CSV'}
                                </button>
                                <button type="button" onClick={handleAddStatement} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all"><Plus size={14} /> Добавить</button>
                            </div>
                        </div>

                        {/* Блок импорта CSV (по аналогии с квизом) */}
                        {importMode ? (
                            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 animate-fade-in-up">
                                <div className="flex items-center gap-3 mb-4 text-indigo-700">
                                    <FileText size={20} />
                                    <h5 className="font-bold text-sm">Вставьте данные CSV (один столбец)</h5>
                                </div>
                                <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">
                                    Первая строка будет пропущена (заголовок).<br/>
                                    Каждое утверждение должно быть на новой строке.
                                </p>
                                <textarea 
                                    className="w-full h-64 p-4 bg-white border border-indigo-100 rounded-xl font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                                    placeholder="Заголовок столбца&#10;Первое утверждение&#10;Второе утверждение..."
                                    value={csvInput}
                                    onChange={e => setCsvInput(e.target.value)}
                                ></textarea>
                                <div className="mt-4 flex justify-end">
                                    <button 
                                        type="button"
                                        onClick={handleCsvImport}
                                        className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-lg"
                                    >
                                        Добавить в список
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {statements.map((s, idx) => (
                                    <div key={s.id} className="flex gap-4 items-start p-4 bg-gray-50 rounded-2xl border border-gray-100 group animate-fade-in-up">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-indigo-600 border border-indigo-100 shrink-0 mt-1">{idx+1}</div>
                                        <textarea 
                                            className="flex-1 bg-white border border-gray-200 p-3 rounded-xl text-sm focus:border-indigo-500 outline-none min-h-[80px]" 
                                            value={s.text} 
                                            onChange={e => handleTextChange(idx, e.target.value)}
                                            placeholder="Введите текст утверждения..."
                                        />
                                        <button type="button" onClick={() => handleRemoveStatement(idx)} className="p-2 text-gray-300 hover:text-red-500 transition-colors shrink-0 mt-1"><Trash size={18}/></button>
                                    </div>
                                ))}
                                {statements.length === 0 && (
                                    <div className="py-12 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-300">
                                        <BarChart3 size={32} className="mb-2 opacity-20" />
                                        <p className="text-xs font-bold uppercase tracking-widest">Список пуст</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </form>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
                    <button type="button" onClick={onClose} className="px-8 py-3 text-gray-500 font-bold hover:text-dark transition-colors">Отмена</button>
                    <button type="submit" form="surveyForm" disabled={loading} className="px-10 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50">
                        {loading ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                        Сохранить опрос
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SurveyEditor;