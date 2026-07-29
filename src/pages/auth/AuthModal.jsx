import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, X } from 'lucide-react';
import { useAuth, isAdminEmail } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useScrollLock from '../../hooks/useScrollLock';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
    const { user, login, signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [view, setView] = useState(initialView); // 'login' or 'signup'
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Sync internal view state with initialView prop when modal opens
    useEffect(() => {
        if (isOpen) {
            setView(initialView);
        }
    }, [isOpen, initialView]);

    useScrollLock(isOpen);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (view === 'login') {
                if (isAdminEmail(formData.email)) {
                    setError('Admin accounts must log in via the Admin Console.');
                    setIsLoading(false);
                    return;
                }
                const result = await login(formData.email, formData.password);
                if (result.success) {
                    onClose();
                }
                else setError(result.message || 'Invalid email or password');
            } else {
                if (isAdminEmail(formData.email)) {
                    setError('This email is reserved for administrators.');
                    setIsLoading(false);
                    return;
                }
                if (formData.password !== formData.confirmPassword) {
                    setError('Passwords do not match');
                    setIsLoading(false);
                    return;
                }
                const result = await signup(formData.name, formData.email, formData.password, formData.phone);
                if (result.success) {
                    onClose();
                    navigate('/');
                }
                else setError(result.message || 'Signup failed. Email might already be in use.');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setIsLoading(true);
        const result = await loginWithGoogle();
        if (result.success) {
            onClose();
            // The AuthProvider will update the user state.
            // If the user is admin, they can be redirected by a global listener or 
            // we can just let them stay if it's a member.
            // However, to satisfy "admin login ... open admin panel", 
            // we should ideally redirect to /admin if we can determine role.
            // For now, simple redirect to home is fine if not admin, 
            // but for admin we want to be sure.
        }
        else setError(result.message || 'Google Login failed');
        setIsLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Wrapper for centering */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-[440px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 sm:p-10 border border-slate-100"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold tracking-tight mb-2">
                                    <span style={{ color: '#27318a', fontFamily: "'Recoleta', Georgia, serif" }}>
                                        {view === 'login' ? 'Welcome Back' : 'Create Account'}
                                    </span>
                                </h2>
                                <p className="text-slate-500 text-sm font-semibold">
                                    {view === 'login' ? 'Sign in to your account' : 'Join our premium collection'}
                                </p>
                            </div>



                            {error && (
                                <div className="mb-4 text-[10px] font-black uppercase tracking-widest text-red-500 text-center">
                                    {error}
                                </div>
                            )}

                            {/* Form */}
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {view === 'signup' && (
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#27318a] transition-colors" size={18} />
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Full Name"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#27318a]/20 focus:border-[#27318a] transition-all"
                                            />
                                        </div>
                                    </div>
                                )}

                                {view === 'signup' && (
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
                                        <div className="relative group">
                                            {/* We can just use the User icon or another appropriate one since we only imported a few. I'll just use a simple SVG or reuse User for now, but a phone icon is better if imported. Lucide Phone might not be imported. Let me just use standard styling without icon or add Phone to imports. Actually, wait. I will add Phone to imports if I need it. Let's see if I can replace it. */}
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#27318a] transition-colors text-xs font-black">+91</span>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                pattern="[0-9]{10}"
                                                maxLength="10"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Phone Number"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#27318a]/20 focus:border-[#27318a] transition-all"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#27318a] transition-colors" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="admin@example.com"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#27318a]/20 focus:border-[#27318a] transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center ml-4 mr-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                                        {view === 'login' && (
                                            <button type="button" className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-[#27318a] transition-colors">Forgot Password?</button>
                                        )}
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#27318a] transition-colors" size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-12 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#27318a]/20 focus:border-[#27318a] transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {view === 'signup' && (
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Confirm Password</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#27318a] transition-colors" size={18} />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                required
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                placeholder="••••••••"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#27318a]/20 focus:border-[#27318a] transition-all"
                                            />
                                        </div>
                                    </div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    style={{ backgroundColor: '#fce513' }}
                                    className={`w-full py-4 rounded-2xl text-[#27318a] font-black uppercase tracking-widest text-xs shadow-xl mt-2 hover:brightness-105 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? 'Processing...' : (view === 'login' ? 'Login' : 'Create Account')}
                                </motion.button>
                            </form>

                            {/* Divider and Google Login removed per user request */}

                            {/* Footer Toggle */}
                            <div className="mt-8 text-center text-slate-400 text-xs font-semibold">
                                {view === 'login' ? (
                                    <>Don't have an account? <button onClick={() => setView('signup')} className="text-[#27318a] font-black hover:underline underline-offset-4">Sign Up</button></>
                                ) : (
                                    <>Already have an account? <button onClick={() => setView('login')} className="text-[#27318a] font-black hover:underline underline-offset-4">Login</button></>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;

