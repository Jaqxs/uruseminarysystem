import { useState, useEffect } from "react";
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { UserRole } from "../lib/auth";
import uruBg from "../assets/uru 2.jpeg";
import uruLogo from "../assets/uru.jfif";

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
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-900">
            {/* Shifting Background Images */}
            {backgroundImages.map((src, index) => (
                <img
                    key={src}
                    src={src}
                    alt={`Background ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-[3000ms] ease-in-out ${index === currentImageIndex ? "opacity-40 animate-slow-zoom" : "opacity-0"
                        }`}
                />
            ))}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-background/20 to-accent/40 z-10" />
            <div className="absolute inset-0 backdrop-blur-[2px] z-10" />

            {/* Content Container */}
            <div className="relative z-20 w-full max-w-[480px] px-6 animate-fade-in">
                {/* Branding */}
                <div className="text-center mb-8">
                    <div className="w-24 h-24 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center mx-auto mb-6 p-4 border border-white/20 hover:scale-105 transition-transform duration-500 shadow-primary/20 bg-clip-padding backdrop-blur-3xl">
                        <img src={uruLogo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-4xl font-black font-heading text-white mb-2 tracking-tight drop-shadow-md">
                        Smart <span className="text-accent underline decoration-4 underline-offset-4 decoration-accent/50">Uru</span>
                    </h1>
                    <p className="text-white/80 font-bold tracking-[0.2em] text-[10px] uppercase drop-shadow-sm">
                        Uru Seminary Management System
                    </p>
                </div>

                {/* Login Card */}
                <div className="glass-card p-10 rounded-[2.5rem] border border-white/20 shadow-2xl bg-white/90 backdrop-blur-2xl">
                    <div className="mb-8 overflow-hidden">
                        <h2 className="text-2xl font-black font-heading text-foreground mb-1 leading-tight">Administrative Access</h2>
                        <p className="text-muted-foreground text-sm font-medium">Verify your identity to proceed.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-1.5 group">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2 mb-1 ml-1 group-focus-within:text-primary transition-colors">
                                <Mail className="w-3.5 h-3.5" /> Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@uruseminary.ac.tz"
                                className="w-full px-6 py-4 rounded-2xl border border-border/80 bg-white/50 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-semibold placeholder:text-muted-foreground/30 shadow-sm"
                            />
                        </div>

                        <div className="space-y-1.5 group">
                            <div className="flex items-center justify-between mb-1 ml-1 mr-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2 group-focus-within:text-primary transition-colors">
                                    <Lock className="w-3.5 h-3.5" /> Password
                                </label>
                                <a href="#" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all">Forgot?</a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full px-6 py-4 pr-14 rounded-2xl border border-border/80 bg-white/50 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-semibold placeholder:text-muted-foreground/30 shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-6 flex items-center text-muted-foreground/40 hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-1">
                            <input
                                type="checkbox"
                                id="remember_me"
                                className="w-4 h-4 rounded-md border-2 border-border text-primary focus:ring-offset-2 focus:ring-primary cursor-pointer transition-all"
                            />
                            <label htmlFor="remember_me" className="text-xs text-muted-foreground font-bold cursor-pointer hover:text-foreground transition-colors select-none">Remember this device</label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-[58px] rounded-2xl bg-gradient-to-r from-primary via-primary to-[#4f46e5] text-white font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-500 hover:-translate-y-1.5 active:scale-[0.97] disabled:opacity-70 group relative overflow-hidden flex items-center justify-center m-0"
                        >
                            {/* Modern Shimmer Effect */}
                            <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer-fast" />

                            {/* Inner Glow Border */}
                            <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />

                            <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Verifying
                                    </span>
                                ) : (
                                    <>
                                        Enter System
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-border/40">
                        <p className="text-xs text-center font-bold text-muted-foreground mb-3 uppercase tracking-wider">Demo Accounts</p>
                        <div className="flex flex-wrap items-center justify-center gap-2">
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
                                    className="px-3 py-2 rounded-xl bg-muted/40 hover:bg-muted text-[10px] font-bold text-muted-foreground hover:text-foreground transition-all uppercase border border-border/50 text-center"
                                >
                                    {role.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/40 text-center">
                        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
                            © {new Date().getFullYear()} Uru Seminary
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
