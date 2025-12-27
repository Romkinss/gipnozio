import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Send, ArrowLeft, Loader2, CheckCircle2, ShieldCheck, QrCode, Smartphone, RefreshCw, XCircle } from 'lucide-react';
import { api } from '../services/api';
import { supabase } from '../services/supabase';
import QRCode from 'react-qr-code';
import { v4 as uuidv4 } from 'uuid';

const BOT_USERNAME = 'gipnozio_bot'; 

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlSessionId = searchParams.get('session_id');
  
  const [sessionId, setSessionId] = useState<string>('');
  // Состояния: loading (инициализация), waiting (выбор входа), bridge (ушел в ТГ), authenticated (успех)
  const [status, setStatus] = useState<'loading' | 'waiting' | 'bridge' | 'authenticated'>(urlSessionId ? 'loading' : 'waiting');
  const [isMobile, setIsMobile] = useState(false);
  const [userName, setUserName] = useState('');
  
  const pollInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSuccess = useCallback(async (data: any) => {
    setUserName(data.first_name || '');
    setStatus('authenticated');
    if (pollInterval.current) clearInterval(pollInterval.current);
    
    const userProfile = {
        id: data.telegram_id,
        first_name: data.first_name,
        username: data.username,
        photo_url: data.photo_url
    };

    try {
        const profile = await api.auth.telegramLogin(userProfile);
        localStorage.setItem('student_user', JSON.stringify(profile));
        
        // Финальный аккорд: задержка для отображения экрана успеха
        setTimeout(() => {
            navigate('/learning');
            window.scrollTo(0, 0);
        }, 1800);
    } catch (e: any) {
        console.error("Login processing error", e);
        setStatus('waiting');
    }
  }, [navigate]);

  const checkStatus = useCallback(async (currentSessionId: string) => {
      if (!currentSessionId) return false;
      
      const { data } = await supabase
          .from('auth_sessions')
          .select('*')
          .eq('id', currentSessionId)
          .maybeSingle();

      if (data && data.status === 'authenticated') {
          handleSuccess(data);
          return true;
      }
      return false;
  }, [handleSuccess]);

  // Технология "Мгновенного пробуждения" (The Resurrection)
  useEffect(() => {
    const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible' && status === 'bridge' && sessionId) {
            checkStatus(sessionId);
        }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [status, sessionId, checkStatus]);

  useEffect(() => {
    const storedUser = localStorage.getItem('student_user');
    if (storedUser) {
        navigate('/learning');
        return;
    }

    const currentSessionId = urlSessionId || uuidv4();
    setSessionId(currentSessionId);
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    const initSession = async () => {
        try {
            if (urlSessionId) {
                const isAuth = await checkStatus(urlSessionId);
                if (isAuth) return;
            }

            if (!urlSessionId) {
                await supabase.from('auth_sessions').insert([{ id: currentSessionId, status: 'pending' }]);
            }
            
            setStatus('waiting');
            pollInterval.current = setInterval(() => {
                checkStatus(currentSessionId);
            }, 3000);

        } catch (e) {
            console.error('Error creating auth session', e);
            setStatus('waiting');
        }
    };
    initSession();

    const channel = supabase
        .channel(`auth_${currentSessionId}`)
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'auth_sessions', filter: `id=eq.${currentSessionId}` }, (payload) => {
            if (payload.new.status === 'authenticated') {
                handleSuccess(payload.new);
            }
        })
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
        if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, [navigate, urlSessionId, checkStatus, handleSuccess]);

  // Ссылки: tg:// для мобильных (без вкладок), https:// для десктопа
  const deepLink = `https://t.me/${BOT_USERNAME}?start=${sessionId}`;
  const mobileLink = `tg://resolve?domain=${BOT_USERNAME}&start=${sessionId}`;

  const startBridge = () => {
      setStatus('bridge');
      // Принудительный клик для мобилок происходит через <a>, здесь просто меняем UI
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <Link to="/" className="absolute top-6 left-6 text-gray-400 hover:text-dark transition-colors flex items-center gap-2 z-20">
        <ArrowLeft size={20} />
        <span className="hidden sm:inline">На главную</span>
      </Link>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gold/15 border border-gray-100 overflow-hidden">
            
            {/* Dynamic Header */}
            <div className={`p-8 text-center text-white relative overflow-hidden transition-all duration-500 ${status === 'authenticated' ? 'bg-green-600' : 'bg-dark'}`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20 shadow-inner">
                        {status === 'authenticated' ? (
                            <CheckCircle2 className="w-8 h-8 text-white animate-bounce" />
                        ) : status === 'bridge' ? (
                            <RefreshCw className="w-8 h-8 text-gold animate-spin" />
                        ) : (
                            <ShieldCheck className="w-8 h-8 text-gold" />
                        )}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide">
                        {status === 'authenticated' ? 'Доступ разрешен' : 'Вход в Академию'}
                    </h1>
                    <p className="text-gray-400 text-sm mt-2 font-medium">
                        {status === 'authenticated' ? 'Добро пожаловать в систему!' : 'Безопасный вход через Telegram'}
                    </p>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-8 flex flex-col items-center justify-center min-h-[420px] relative">
                
                {/* 1. Initialization State */}
                {status === 'loading' && (
                    <div className="flex flex-col items-center text-gray-400 animate-pulse">
                        <Loader2 className="animate-spin w-12 h-12 mb-4 text-gold" />
                        <p className="text-sm font-bold uppercase tracking-widest">Синхронизация...</p>
                    </div>
                )}

                {/* 2. Success State (The Final Accord) */}
                {status === 'authenticated' && (
                    <div className="flex flex-col items-center text-center animate-fade-in-up">
                        <div className="text-5xl mb-6">✨</div>
                        <p className="font-serif font-bold text-3xl text-dark leading-tight">Рады видеть вас, <br/><span className="text-gold">{userName}</span>!</p>
                        <p className="text-gray-400 text-sm mt-4">Личный кабинет настраивается...</p>
                        <div className="mt-8 w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gold animate-[loading_2s_ease-in-out_infinite]"></div>
                        </div>
                    </div>
                )}

                {/* 3. Bridge State (Waiting for Signal) */}
                {status === 'bridge' && (
                    <div className="w-full flex flex-col items-center text-center space-y-8 animate-fade-in-up">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl animate-ping"></div>
                            <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center border-2 border-gold/30 relative">
                                <Send size={40} className="text-gold rotate-[-10deg] animate-pulse" />
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-dark font-serif">Ожидаем подтверждения...</h3>
                            <p className="text-gray-500 text-sm leading-relaxed px-4">
                                Мы отправили запрос в Telegram. <br/>Пожалуйста, нажмите <b>«ЗАПУСТИТЬ»</b> в боте.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3 w-full">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Соединение установлено</span>
                        </div>

                        <button 
                            onClick={() => setStatus('waiting')}
                            className="text-gray-400 hover:text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors pt-4"
                        >
                            <XCircle size={14} /> Отменить и вернуться
                        </button>
                    </div>
                )}

                {/* 4. Choice State (Waiting to start) */}
                {status === 'waiting' && (
                    <div className="w-full space-y-8 animate-fade-in-up">
                        {isMobile ? (
                            /* Mobile Flow - Direct App Link */
                            <div className="space-y-6">
                                <a 
                                    href={mobileLink} 
                                    onClick={startBridge}
                                    className="bg-[#229ED9] hover:bg-[#1f8fb8] active:bg-[#1a7ca1] text-white font-bold py-5 px-8 rounded-[1.5rem] shadow-xl shadow-blue-200/50 flex items-center justify-center gap-3 w-full transform active:scale-[0.98] transition-all duration-300 group"
                                >
                                    <Send size={24} className="rotate-[-10deg] group-active:translate-x-4 group-active:-translate-y-4 transition-transform" />
                                    <span className="text-lg">Открыть Telegram</span>
                                </a>
                                <div className="flex items-center gap-3 justify-center text-gray-400">
                                    <Smartphone size={16} />
                                    <p className="text-[10px] font-bold uppercase tracking-widest">Вкладка останется активной</p>
                                </div>
                            </div>
                        ) : (
                            /* Desktop Flow - Button + QR */
                            <div className="flex flex-col items-center space-y-8">
                                <div className="w-full">
                                    <a 
                                        href={deepLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        onClick={startBridge}
                                        className="bg-[#229ED9] hover:bg-[#1f8fb8] active:bg-[#1a7ca1] text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-blue-200/50 flex items-center justify-center gap-3 w-full transform hover:-translate-y-1 transition-all duration-300 group"
                                    >
                                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        <span className="text-base">Войти через Telegram</span>
                                    </a>
                                </div>

                                <div className="w-full flex items-center gap-4">
                                    <div className="h-px bg-gray-100 flex-1"></div>
                                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em]">ИЛИ</span>
                                    <div className="h-px bg-gray-100 flex-1"></div>
                                </div>

                                <div className="w-full flex flex-col items-center">
                                    <div className="relative p-1.5 bg-gradient-to-tr from-gold via-gold-light to-gold-dark rounded-3xl shadow-gold/20 shadow-xl transform transition-transform duration-500 hover:scale-[1.02]">
                                        <div className="bg-white p-3 rounded-[1.4rem] shadow-inner flex items-center justify-center">
                                            <QRCode value={deepLink} size={160} viewBox={`0 0 160 160`} fgColor="#1A1A1A" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                        <QrCode size={14} className="text-gold" /> Отсканируйте камерой
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-4 border-t border-gray-50">
                            <p className="text-[10px] text-gray-400 text-center leading-relaxed font-medium">
                                Нажимая на кнопку входа, вы принимаете условия <Link to="/blog/terms" target="_blank" className="text-gold hover:underline font-bold">Оферты</Link> и даете согласие на обработку данных согласно <Link to="/blog/policy" target="_blank" className="text-gold hover:underline font-bold">Политике конфиденциальности</Link>.
                            </p>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="bg-gray-50 p-5 text-center border-t border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">&copy; {new Date().getFullYear()} GIPNOZIO Academy</p>
            </div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;