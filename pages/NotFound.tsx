import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import SEO from '../components/SEO';
import { Compass, Home, BookOpen } from 'lucide-react';
import { api } from '../services/api';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkRedirect = async () => {
        // Strip leading slash for DB check
        const path = location.pathname.substring(1); 
        
        try {
            const redirect = await api.redirects.get(path);
            if (redirect) {
                navigate('/' + redirect.to_path, { replace: true });
                return;
            }
        } catch (e) {
            console.error("Redirect check failed", e);
        } finally {
            setChecking(false);
        }
    };
    
    checkRedirect();
  }, [location.pathname, navigate]);

  if (checking) {
      return (
        <PublicLayout>
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
            </div>
        </PublicLayout>
      );
  }

  return (
    <PublicLayout>
      <SEO 
        title="Страница не найдена - 404" 
        noindex={true} // Critical for SEO: tell Google not to index error pages
      />
      
      <div className="min-h-[70vh] flex items-center justify-center bg-light relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-10 right-10 w-64 h-64 bg-gold rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-dark rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20">
                    <Compass size={48} className="text-gold-dark" />
                </div>
            </div>
            
            <h1 className="text-8xl md:text-9xl font-serif font-bold text-dark mb-4 opacity-10">404</h1>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-6 -mt-10 md:-mt-12 relative z-20">
                Страница не найдена
            </h2>
            
            <p className="text-lg text-gray-600 max-w-lg mx-auto mb-10 leading-relaxed">
                Похоже, вы забрели в неизведанные уголки подсознания. 
                Эта страница была перемещена или никогда не существовала.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                    to="/" 
                    className="px-8 py-3 bg-dark text-white rounded-lg font-bold hover:bg-black transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                    <Home size={18} /> На главную
                </Link>
                <Link 
                    to="/blog" 
                    className="px-8 py-3 border border-gray-300 text-dark rounded-lg font-medium hover:border-gold hover:text-gold-dark transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                    <BookOpen size={18} /> Читать блог
                </Link>
            </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default NotFound;