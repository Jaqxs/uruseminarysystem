import { User, Mail, Phone, MapPin, Briefcase, Calendar, Shield, Camera, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";

export default function Profile() {
    const { t } = useLanguage();
    const user = {
        name: t('adminName'),
        role: t('superAdmin'),
        email: "admin@bendel.ac.tz",
        phone: "+255 712 345 678",
        location: "Dar es Salaam, Tanzania",
        joined: `${t('january')} 2024`,
        dept: t('itDept'),
        bio: t('adminBio'),
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
            {/* Header Profile Card */}
            <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-card">
                <div className="h-32 bg-gradient-hero" />
                <div className="px-8 pb-8">
                    <div className="relative flex items-end justify-between -mt-12 mb-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-3xl bg-gradient-primary border-4 border-card flex items-center justify-center text-white text-4xl font-bold shadow-md">
                                AM
                            </div>
                            <button onClick={() => toast.info(t('openingImageManager'))} className="absolute bottom-0 right-0 p-2 rounded-xl bg-background border border-border shadow-sm text-muted-foreground hover:text-primary transition-colors">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <button onClick={() => toast.info(t('preparingEditProfile'))} className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border bg-background text-sm font-semibold hover:bg-muted transition-colors">
                            <Edit2 className="w-4 h-4" /> {t('editProfile')}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold font-heading">{user.name}</h1>
                                <p className="text-primary font-semibold flex items-center gap-2">
                                    <Shield className="w-4 h-4" /> {user.role}
                                </p>
                            </div>
                            <p className="text-muted-foreground leading-relaxed max-w-xl">
                                {user.bio}
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Briefcase className="w-4 h-4" /> {user.dept}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4" /> {t('joinedLabel')} {user.joined}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="font-medium">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="font-medium">{user.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="font-medium">{user.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Activity Log */}
                <div className="rounded-3xl border border-border bg-card shadow-card p-6">
                    <h3 className="font-bold font-heading mb-6">{t('recentActivity')}</h3>
                    <div className="space-y-6">
                        {[
                            { text: t('updatedForm4ATimetable'), time: `2 ${t('hoursAgo')}`, icon: Calendar, color: "bg-blue-500" },
                            { text: t('approvedFees'), time: `${t('yesterday')}, 4:32 PM`, icon: Shield, color: "bg-green-500" },
                            { text: t('sentMeetingNotice'), time: `${t('yesterday')}, 10:15 AM`, icon: Mail, color: "bg-amber-500" },
                            { text: t('changedPassword'), time: `3 ${t('daysAgo')}`, icon: User, color: "bg-purple-500" },
                        ].map((activity, i) => (
                            <div key={i} className="flex gap-4">
                                <div className={`w-10 h-10 rounded-xl ${activity.color} bg-opacity-10 flex items-center justify-center flex-shrink-0`}>
                                    <activity.icon className={`w-5 h-5`} style={{ color: activity.color.replace('bg-', '') }} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{activity.text}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Account Security */}
                <div className="rounded-3xl border border-border bg-card shadow-card p-6">
                    <h3 className="font-bold font-heading mb-6">{t('securitySettings')}</h3>
                    <div className="space-y-4">
                        <button onClick={() => toast.success(t('security2faSet'))} className="w-full flex items-center justify-between p-4 rounded-2xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all text-left">
                            <div>
                                <p className="text-sm font-semibold">{t('twoFactor')}</p>
                                <p className="text-xs text-muted-foreground">{t('addingSecurity')}</p>
                            </div>
                            <div className="w-10 h-5 rounded-full bg-accent flex items-center justify-end px-0.5">
                                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                            </div>
                        </button>
                        <button onClick={() => toast.info(t('loadingLoginHistory'))} className="w-full flex items-center justify-between p-4 rounded-2xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all text-left">
                            <div>
                                <p className="text-sm font-semibold">{t('loginHistory')}</p>
                                <p className="text-xs text-muted-foreground">{t('seeLoginDevices')}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button onClick={() => toast.error(t('loggedOutAll'))} className="w-full flex items-center justify-between p-4 rounded-2xl border border-border hover:border-destructive/30 hover:bg-destructive-light transition-all text-left group">
                            <div>
                                <p className="text-sm font-semibold text-destructive">{t('logoutAll')}</p>
                                <p className="text-xs text-muted-foreground">{t('closeEverywhere')}</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
    );
}
