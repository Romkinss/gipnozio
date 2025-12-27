import React, { useEffect } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Blog from './pages/Blog';
import Pulse from './pages/Pulse';
import BlogPost from './pages/BlogPost';
import AuthorPage from './pages/AuthorPage';
import ClientPage from './pages/ClientPage';
import TestimonialsPage from './pages/TestimonialsPage';
import Admin from './pages/Admin';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import LearningDashboard from './pages/LearningDashboard';
import LessonView from './pages/LessonView';
import NotFound from './pages/NotFound';

// Компонент для отслеживания просмотров в Яндекс.Метрике при переходах между роутами
const YandexMetrikaTracker: React.FC = () => {
  const location = useLocation();
  const METRIKA_ID = 105892532;

  useEffect(() => {
    // Проверяем, загружен ли счетчик
    if (typeof (window as any).ym === 'function') {
      (window as any).ym(METRIKA_ID, 'hit', location.pathname + location.search);
    }
  }, [location]);

  return null;
};

const App: React.FC = () => {
  // HYBRID ROUTER STRATEGY
  const isProduction = window.location.hostname === 'gipnozio.ru' || window.location.hostname === 'www.gipnozio.ru';
  const Router = isProduction ? BrowserRouter : HashRouter;

  return (
    <Router>
      <YandexMetrikaTracker />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/pulse" element={<Pulse />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        
        {/* SPECIAL PAGES */}
        <Route path="/author/:slug" element={<AuthorPage />} />
        <Route path="/clients" element={<ClientPage />} />
        
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/administrator" element={<AdminLoginPage />} />
        <Route path="/learning" element={<LearningDashboard />} />
        <Route path="/learning/lesson/:slug" element={<LessonView />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;