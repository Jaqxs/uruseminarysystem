import { useState, useEffect } from "react";
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../lib/auth";
import uruBg from "../assets/uru_2.jpeg";
import uruLogo from "../assets/uru_logo.jpg";

export default function Login() {
    const { t } = useLanguage();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    const backgroundImages = [
        uruBg
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        let roleToLogin: UserRole = 'admin'; // default fallback
        const lowerEmail = email.toLowerCase();
        if (lowerEmail.includes("teacher") || lowerEmail.includes("kamau")) roleToLogin = 'teacher';
        else if (lowerEmail.includes("bursar") || lowerEmail.includes("ally")) roleToLogin = 'bursar';
        else if (lowerEmail.includes("director") || lowerEmail.includes("mrisho")) roleToLogin = 'director';
        else if (lowerEmail.includes("academic") || lowerEmail.includes("tarimo")) roleToLogin = 'academic_master';

        login(roleToLogin);
        toast.success(`Login Successful as ${roleToLogin.toUpperCase()}!`);

        if (roleToLogin === 'teacher') {
            navigate("/teacher");
        } else if (roleToLogin === 'academic_master') {
            navigate("/academic-master");
        } else {
            navigate("/");
        }
    };

    const handleDemoLogin = (role: UserRole) => {
        setEmail(`${role}@uruseminary.ac.tz`);
        setPassword("password123");
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-y-auto bg-slate-900 py-12 px-4 selection:bg-primary selection:text-white">
            {/* Shifting Background Images */}
            {backgroundImages.map((src, index) => (
                <img
                    key={src}
                    src={src}
                    alt={`Background ${index + 1}`}
                    className={`fixed inset-0 w-full h-full object-cover scale-105 transition-opacity duration-[3000ms] ease-in-out ${index === currentImageIndex ? "opacity-30 animate-slow-zoom" : "opacity-0"
                        }`}
                />
            ))}

            {/* Gradient Overlays */}
            <div className="fixed inset-0 bg-gradient-to-br from-primary/70 via-background/40 to-slate-900/80 z-10" />
            <div className="fixed inset-0 backdrop-blur-[1px] z-10" />

            {/* Content Container */}
            <div className="relative z-20 w-full max-w-[480px] animate-fade-in py-8">
                {/* Branding */}
                <div className="text-center mb-10">
                    <div className="w-32 h-32 rounded-3xl bg-black shadow-[0_0_60px_rgba(255,215,0,0.3)] flex items-center justify-center mx-auto mb-6 p-1 border-2 border-white/20 hover:scale-105 transition-all duration-500 ring-4 ring-white/5 overflow-hidden">
                        <img src={uruLogo} alt="Logo" className="w-full h-full object-contain scale-[1.02]" />
                    </div>
                    <h1 className="text-5xl font-black font-heading text-white mb-2 tracking-tighter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                        Smart <span className="text-accent underline decoration-[6px] underline-offset-[8px] decoration-accent/40">Uru</span>
                    </h1>
                    <p className="text-white font-bold tracking-[0.4em] text-xs uppercase drop-shadow-md mt-4 opacity-90">
                        Uru Seminary System
                    </p>
                </div>

                {/* Login Card */}
                <div className="glass-card p-6 sm:p-12 rounded-[3.5rem] border border-white/30 shadow-2xl bg-white/95 backdrop-blur-3xl overflow-visible">
                    <div className="mb-10 text-center sm:text-left">
                        <h2 className="text-3xl font-black font-heading text-slate-900 mb-2 leading-tight">Admin Login</h2>
                        <p className="text-slate-500 text-sm font-semibold tracking-wide">Enter your credentials to manage the seminary.</p>
                    </div>

                    <form className="space-y-8" onSubmit={handleLogin}>
                        <div className="space-y-2 group">
                            <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 flex items-center gap-2 mb-1 ml-1 group-focus-within:text-primary transition-colors">
                                <Mail className="w-4 h-4" /> Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@uruseminary.ac.tz"
                                className="w-full px-6 py-5 rounded-[1.25rem] border-2 border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-base font-bold placeholder:text-slate-300 shadow-inner"
                            />
                        </div>

                        <div className="space-y-2 group">
                            <div className="flex items-center justify-between mb-1 ml-1 mr-1">
                                <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 flex items-center gap-2 group-focus-within:text-primary transition-colors">
                                    <Lock className="w-4 h-4" /> Password
                                </label>
                                <a href="#" className="text-[11px] font-black text-primary uppercase tracking-[0.15em] hover:underline decoration-2 underline-offset-4 transition-all">Forgot?</a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full px-6 py-5 pr-16 rounded-[1.25rem] border-2 border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-base font-bold placeholder:text-slate-300 shadow-inner"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-300 hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-2">
                            <input
                                type="checkbox"
                                id="remember_me"
                                className="w-5 h-5 rounded-lg border-2 border-slate-200 text-primary focus:ring-offset-2 focus:ring-primary cursor-pointer transition-all appearance-none checked:bg-primary checked:border-primary relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-white checked:after:text-xs checked:after:font-bold"
                            />
                            <label htmlFor="remember_me" className="text-sm text-slate-500 font-bold cursor-pointer hover:text-slate-900 transition-colors select-none">Remember this device</label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-[64px] rounded-[1.25rem] bg-slate-950 text-white font-black text-sm uppercase tracking-[0.3em] shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2 active:scale-[0.98] disabled:opacity-70 group relative overflow-hidden flex items-center justify-center m-0"
                        >
                            {/* Modern Shimmer Effect */}
                            <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer-fast" />

                            <span className="relative z-10 flex items-center gap-3 drop-shadow-md">
                                {isLoading ? (
                                    <span className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
                                        Verifying
                                    </span>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-100">
                        <p className="text-[11px] text-center font-black text-slate-400 mb-4 uppercase tracking-[0.25em]">Quick Access Roles</p>
                        <div className="grid grid-cols-2 xs:grid-cols-3 sm:flex sm:flex-wrap items-center justify-center gap-3">
                            {[
                                { id: 'admin', label: 'Rector' },
                                { id: 'director', label: 'Vice Rector' },
                                { id: 'bursar', label: 'Bursar' },
                                { id: 'academic_master', label: 'Academic Master' },
                                { id: 'teacher', label: 'Staff' }
                            ].map((role) => (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => handleDemoLogin(role.id as UserRole)}
                                    className="px-4 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-[10px] font-black text-slate-500 hover:text-slate-900 transition-all uppercase border-2 border-transparent hover:border-slate-200 text-center whitespace-nowrap"
                                >
                                    {role.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                        <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em]">
                            © {new Date().getFullYear()} Uru Seminary System
                        </p>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slow-zoom {
                    from { transform: scale(1); }
                    to { transform: scale(1.15); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s linear infinite alternate;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes shimmer-fast {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(100%); }
                }
                .group-hover\\:animate-shimmer-fast {
                    animation: shimmer-fast 1.5s infinite;
                }
            `}} />
        </div >
    );
}
