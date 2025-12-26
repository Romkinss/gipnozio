// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: ConsultationsTab.tsx
// Причина: изоляция логики управления заявками
// Файл: /src/components/admin/tabs/ConsultationsTab.tsx
// Статус: изменяется (автономизация)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useEffect, useCallback } from 'react';
import { Consultation } from '../../../types';
import { api } from '../../../services/api';
import { RefreshCw, MessageSquare } from 'lucide-react';
import { safeFormatDate } from '../../../utils/dateUtils';

const ConsultationsTab: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
        const data = await api.consultations.list();
        setConsultations(data || []);
    } catch (e) {
        console.error("Consultations Load Error:", e);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  if (loading && consultations.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <RefreshCw size={48} className="animate-spin mb-4 text-gold" />
              <p className="font-bold text-xs uppercase tracking-widest">Загрузка входящих заявок...</p>
          </div>
      );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-dark">Входящие заявки ({consultations.length})</h2>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Лиды с форм обратной связи</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Клиент</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Контакты</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Интерес / Страница</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Дата</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {consultations.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                    <span className="font-bold text-dark">{c.name}</span>
                    {c.status === 'new' && <span className="ml-2 inline-block w-2 h-2 bg-gold rounded-full animate-pulse"></span>}
                    </td>
                    <td className="px-6 py-4 text-sm">
                    <div className="font-medium text-indigo-600">{c.phone}</div>
                    <div className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">{c.email || '—'}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                    <div className="font-bold text-dark truncate max-w-[200px]" title={c.source_page}>
                        {c.source_page || 'Главная страница'}
                    </div>
                    {c.source_url && (
                        <a 
                            href={c.source_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-[10px] text-gray-400 hover:text-gold transition-colors underline truncate block max-w-[200px]"
                        >
                            {c.source_url}
                        </a>
                    )}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                    {safeFormatDate(c.created_at)}
                    </td>
                </tr>
                ))}
                {consultations.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-gray-400 italic">
                        <div className="flex flex-col items-center gap-3">
                            <MessageSquare size={40} className="text-gray-100" />
                            Заявок пока нет.
                        </div>
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default ConsultationsTab;