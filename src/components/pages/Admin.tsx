// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ ЗОНА ДЕЙСТВИЯ: Admin.tsx
// Причина: Удаление функционала «Seed» (кнопка База) и очистка интерфейса
// Файл: /pages/Admin.tsx
// Статус: изменено (удалены неиспользуемые элементы)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { LogOut, BookOpen, FileText, Activity, Users, MessageSquare, Star, HelpCircle, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';

// Автономные вкладки
import StudentsTab from '../../admin/tabs/StudentsTab';
import ArticlesTab from '../../admin/tabs/ArticlesTab';
import LessonsTab from '../../admin/tabs/LessonsTab';
import TestimonialsTab from '../../admin/tabs/TestimonialsTab';
import ConsultationsTab from '../../admin/tabs/ConsultationsTab';
import QuizzesTab from '../../admin/tabs/QuizzesTab';
import SurveysTab from '../../admin/tabs/SurveysTab';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('students');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const isDemo = sessionStorage.getItem('demo_admin') === 'true';
      if (!session && !isDemo) {
        window.location.href = '/administrator';
      } else {
        setIsAuthorized(true);
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem('demo_admin');
    window.location.href = '/administrator';
  };

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-dark font-sans">
      <header className="border-b border-gray-200 bg-white pt-8 pb-0 px-4 md:px-8 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center text-gold"><Activity size={24} /></div>
                    <div>
                        <h1 className="text-2xl font-serif font-bold leading-none">Админ-центр</h1>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Gipnozio Academy</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 p-2 bg-gray-50 rounded-lg transition-colors" title="Выйти">
                        <LogOut size={22} />
                    </button>
                </div>
            </div>
            <nav className="flex gap-8 overflow-x-auto no-scrollbar">
                {[
                    { id: 'students', label: 'Студенты', icon: <Users size={18}/> },
                    { id: 'articles', label: 'Блог', icon: <FileText size={18}/> },
                    { id: 'lessons', label: 'Уроки', icon: <BookOpen size={18}/> },
                    { id: 'quizzes', label: 'Квизы', icon: <HelpCircle size={18}/> },
                    { id: 'surveys', label: 'Опросы', icon: <BarChart3 size={18}/> },
                    { id: 'testimonials', label: 'Отзывы', icon: <Star size={18}/> },
                    { id: 'consultations', label: 'Заявки', icon: <MessageSquare size={18}/> }
                ].map(tab => (
                    <button 
                        key={tab.id} 
                        onClick={() => setActiveTab(tab.id)} 
                        className={`pb-4 px-2 text-sm font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'border-dark text-dark' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
          {activeTab === 'students' && <StudentsTab />}
          {activeTab === 'articles' && <ArticlesTab />}
          {activeTab === 'lessons' && <LessonsTab />}
          {activeTab === 'quizzes' && <QuizzesTab />}
          {activeTab === 'surveys' && <SurveysTab />}
          {activeTab === 'testimonials' && <TestimonialsTab />}
          {activeTab === 'consultations' && <ConsultationsTab />}
      </main>
    </div>
  );
};

export default Admin;