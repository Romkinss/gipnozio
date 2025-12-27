// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: StudentsTab.tsx
// Причина: изоляция логики управления списком студентов
// Файл: /src/components/admin/tabs/StudentsTab.tsx
// Статус: изменяется (автономизация)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../../../types';
import { api } from '../../../services/api';
import { RefreshCw, Search } from 'lucide-react';
import { safeFormatDate } from '../../../utils/dateUtils';

const StudentsTab: React.FC = () => {
  const [students, setStudents] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
        const data = await api.users.list();
        setStudents(data || []);
    } catch (e) {
        console.error("Students Load Error:", e);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleRoleUpdate = async (telegramId: number, newLevel: number) => {
      try {
          await api.users.updateRole(telegramId, newLevel);
          setStudents(prev => prev.map(s => s.telegram_id === telegramId ? {...s, role_level: newLevel} : s));
      } catch (e: any) { alert('Ошибка обновления прав: ' + e.message); }
  };

  const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const filteredStudents = students.filter(s => 
    s.first_name?.toLowerCase().includes(search.toLowerCase()) || 
    s.username?.toLowerCase().includes(search.toLowerCase()) ||
    s.telegram_id.toString().includes(search)
  );

  if (loading && students.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <RefreshCw size={48} className="animate-spin mb-4 text-gold" />
              <p className="font-bold text-xs uppercase tracking-widest">Загрузка студентов...</p>
          </div>
      );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-xl font-bold text-dark">База студентов ({students.length})</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Управление уровнями доступа</p>
        </div>
        <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
                type="text" 
                placeholder="Поиск по имени или ID..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:border-gold outline-none transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Имя</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Telegram</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Доступ</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Дата входа</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {filteredStudents.map(s => (
                <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        {s.avatar_url && !s.avatar_url.includes('placeholder') ? (
                        <img src={s.avatar_url} className="w-10 h-10 rounded-full border border-gray-200 object-cover" alt={s.first_name} />
                        ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-gold-dark flex items-center justify-center text-white font-serif font-bold text-sm shadow-inner border border-gold/30">
                            {getInitials(s.first_name)}
                        </div>
                        )}
                        <span className="font-bold text-dark">{s.first_name}</span>
                    </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="font-mono text-xs">{s.telegram_id}</div>
                    <div className="text-indigo-500 font-medium">@{s.username || 'скрыт'}</div>
                    </td>
                    <td className="px-6 py-4">
                    <select 
                        value={s.role_level} 
                        onChange={(e) => handleRoleUpdate(s.telegram_id, parseInt(e.target.value))}
                        className="bg-gray-100 border-none rounded-lg text-xs font-bold px-3 py-1.5 focus:ring-2 focus:ring-gold/20 cursor-pointer transition-all hover:bg-gray-200"
                    >
                        <option value="1">Уровень 1 (Гость)</option>
                        <option value="2">Уровень 2 (Базовый)</option>
                        <option value="3">Уровень 3 (Профи)</option>
                        <option value="4">Уровень 4 (VIP)</option>
                    </select>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                    {safeFormatDate(s.created_at)}
                    </td>
                </tr>
                ))}
                {filteredStudents.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">Список пуст.</td></tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsTab;