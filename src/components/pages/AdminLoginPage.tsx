
import React, { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import { ShieldCheck, Lock, AlertTriangle, FlaskConical } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { IS_SANDBOX_MODE } from '../../config/sandbox';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session || sessionStorage.getItem('demo_admin') === 'true') {
        window.location.href = '/admin';
      }
    });
  }, [navigate]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Ошибка входа: ' + error.message);
      setLoading(false);
    } else {
      window.location.href = '/admin';
    }
  };

  const handleDemoAdminLogin = () => {
      sessionStorage.setItem('demo_admin', 'true');
      window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-dark-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-800">
            <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-4">
                <div className="bg-dark text-gold p-2 rounded-lg">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-dark">Администратор</h2>
                    <p className="text-xs text-gray-500">Панель управления сайтом</p>
                </div>
            </div>
            
            <div className="p-8">
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-xs border border-red-100 flex items-start gap-2">
                        <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-5">
                    <div className="group">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:bg-white focus:border-gold outline-none transition-all placeholder-gray-400 text-sm"
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Пароль</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:bg-white focus:border-gold outline-none transition-all placeholder-gray-400 text-sm"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-dark hover:bg-black text-white font-bold py-3 rounded-lg transition-all shadow-lg mt-2 text-sm disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Lock size={16} />}
                        {loading ? 'Вход...' : 'Войти в систему'}
                    </button>
                </form>

                {IS_SANDBOX_MODE && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                      <button 
                          onClick={handleDemoAdminLogin}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-lg transition-all flex justify-center items-center gap-2 text-xs uppercase tracking-widest"
                      >
                          <FlaskConical size={16} /> Войти как ДЕМО-АДМИН
                      </button>
                  </div>
                )}
            </div>
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
                <a href="/" className="text-xs text-gray-400 hover:text-dark transition-colors">Вернуться на сайт</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
