import { useState } from "react";
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";

export default function Login() {
    const { t } = useLanguage();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would validate here
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -ml-64 -mb-64" />

            <div className="w-full max-w-[400px] animate-fade-in relative z-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 shadow-glow overflow-hidden p-2">
                        <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold font-heading mb-2">{t('welcomeBack')}</h1>
                    <p className="text-muted-foreground">{t('schoolSystem')}</p>
                </div>

                <div className="glass-card p-8 rounded-3xl">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2 px-1">{t('emailLabel')}</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@bendel.ac.tz"
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2 px-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block">{t('passwordLabel')}</label>
                                <a href="#" className="text-[10px] font-bold text-primary hover:underline">{t('forgotPassword')}</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-1">
                            <input type="checkbox" id="remember" className="rounded-md border-border text-primary focus:ring-primary" />
                            <label htmlFor="remember" className="text-xs text-muted-foreground font-medium">{t('rememberMe')}</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-primary text-white font-bold shadow-md-blue hover:shadow-lg-blue transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {t('loginButton')}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Bendel Schools Nexus. {t('copyright')}
                    </p>
                </div>
            </div>
        </div>
    );
}
