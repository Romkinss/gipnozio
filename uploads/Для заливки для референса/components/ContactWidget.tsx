
import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Send, X, Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { contentService } from '../services/contentService';
import { IS_SANDBOX_MODE } from '../config/sandbox';

const ContactWidget: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Listen for custom event to open widget from other components (Footer, etc)
    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            setShowForm(true);
        };
        window.addEventListener('open-contact-form', handleOpen);
        return () => window.removeEventListener('open-contact-form', handleOpen);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await contentService.submitConsultation({
                name,
                phone,
                source_page: document.title.split('|')[0].trim(),
                source_url: window.location.href
            });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setShowForm(false);
                setIsOpen(false);
                setName('');
                setPhone('');
            }, 3000);
        } catch (error) {
            alert('Ошибка при отправке. Пожалуйста, попробуйте еще раз.');
        } finally {
            setLoading(false);
        }
    };

    const handleSecretAdminLogin = () => {
        if (IS_SANDBOX_MODE) {
            sessionStorage.setItem('demo_admin', 'true');
            navigate('/admin');
            setIsOpen(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            {/* FAB Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gold shadow-gold text-dark flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95 group relative overflow-hidden ${isOpen ? 'rotate-90' : 'animate-pulse'}`}
                aria-label="Связаться с нами"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>

            {/* Menu */}
            {isOpen && !showForm && (
                <div className="absolute bottom-20 right-0 flex flex-col gap-4 animate-fade-in-up">
                    {/* AI Helper Placeholder / Secret Admin Entry */}
                    <div className="flex items-center gap-3 justify-end group">
                        <span className="bg-white/90 backdrop-blur shadow-md px-3 py-1 rounded-lg text-xs font-bold text-gray-400 border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                            {IS_SANDBOX_MODE ? 'Вход в панель' : 'Скоро'}
                        </span>
                        <div 
                            onClick={handleSecretAdminLogin}
                            className={`w-12 h-12 rounded-full bg-gray-100 text-gray-300 flex items-center justify-center shadow-md ${IS_SANDBOX_MODE ? 'cursor-pointer hover:bg-white hover:text-gold transition-all' : 'cursor-not-allowed'}`}
                        >
                            <Sparkles size={20} />
                        </div>
                    </div>

                    {/* Telegram */}
                    <div className="flex items-center gap-3 justify-end group">
                        <span className="bg-white/90 backdrop-blur shadow-md px-3 py-1 rounded-lg text-xs font-bold text-dark border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">Telegram Романа</span>
                        <a 
                            href="https://t.me/Roman_Tretiakov" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-[#229ED9] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        >
                            <Send size={20} className="rotate-[-10deg] ml-[-2px]" />
                        </a>
                    </div>

                    {/* Call Form Trigger */}
                    <div className="flex items-center gap-3 justify-end group">
                        <span className="bg-white/90 backdrop-blur shadow-md px-3 py-1 rounded-lg text-xs font-bold text-dark border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">Заказать звонок</span>
                        <button 
                            onClick={() => setShowForm(true)}
                            className="w-12 h-12 rounded-full bg-gold text-dark flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        >
                            <Phone size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 bg-dark/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up">
                    <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                        <div className="bg-dark p-6 text-white relative">
                            <button 
                                onClick={() => setShowForm(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="text-xl font-serif font-bold text-gold">Заказать звонок</h3>
                            <p className="text-gray-400 text-xs mt-1">Оставьте контакты, и мы перезвоним</p>
                        </div>

                        <div className="p-8">
                            {success ? (
                                <div className="text-center py-8 animate-fade-in-up">
                                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                                        <Send size={24} />
                                    </div>
                                    <p className="font-bold text-dark">Спасибо за доверие!</p>
                                    <p className="text-sm text-gray-500 mt-2">Роман свяжется с вами в ближайшее время.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Ваше имя</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:bg-white focus:border-gold outline-none transition-all text-sm" 
                                            placeholder="Как к вам обращаться?"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Телефон</label>
                                        <input 
                                            type="tel" 
                                            className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:bg-white focus:border-gold outline-none transition-all text-sm" 
                                            placeholder="+7 (___) ___-__-__"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="w-full bg-gold hover:bg-gold-dark text-dark font-bold py-3.5 rounded-xl transition-all shadow-gold flex items-center justify-center gap-2 mt-4 text-sm uppercase tracking-widest disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                        {loading ? 'Отправка...' : 'Жду звонка'}
                                    </button>
                                    <p className="text-[9px] text-gray-400 text-center leading-relaxed px-4">
                                        Нажимая кнопку, вы соглашаетесь с <a href="/blog/policy" className="underline hover:text-gold transition-colors">политикой конфиденциальности</a>.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactWidget;
