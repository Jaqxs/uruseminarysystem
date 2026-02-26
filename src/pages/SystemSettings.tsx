import { useLanguage } from "../context/LanguageContext";
import { Settings as SettingsIcon, School, Globe, Bell, Shield, Palette, Save } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const { t } = useLanguage();

  const schoolDetails = [
    { label: t('schoolNameLabel'), value: "Bendel Schools" },
    { label: t('locationLabel'), value: "Dar es Salaam, Tanzania" },
    { label: t('emailLabelSetting'), value: "info@bendelschools.ac.tz" },
    { label: t('phoneLabel'), value: "+255 22 123 4567" },
    { label: t('academicYearLabel'), value: "2024/2025" },
    { label: t('currentTermLabel'), value: t('term2') },
  ];

  const gradingSystem = [
    { grade: "A", range: "80 – 100", points: "4.0", color: "text-accent" },
    { grade: "B", range: "65 – 79", points: "3.0", color: "text-primary" },
    { grade: "C", range: "50 – 64", points: "2.0", color: "text-info" },
    { grade: "D", range: "40 – 49", points: "1.0", color: "text-warning" },
    { grade: "F", range: "0 – 39", points: "0.0", color: "text-destructive" },
  ];

  const notificationSettings = [
    { label: t('attendanceNotifications'), enabled: true },
    { label: t('feeReminders'), enabled: true },
    { label: t('examResults'), enabled: true },
    { label: t('generalAnnouncements'), enabled: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* School Info */}
        <div className="rounded-2xl border border-border bg-card shadow-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <School className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground font-heading">{t('schoolInfo')}</h3>
          </div>
          <div className="flex flex-col items-center mb-6 p-4 rounded-2xl bg-muted/30 border border-dashed border-border">
            <div className="w-24 h-24 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden p-2 mb-3">
              <img src="/logo.jpg" alt="School Logo" className="w-full h-full object-contain" />
            </div>
            <button onClick={() => toast.info(t('openingFileManager'))} className="text-[10px] font-bold uppercase text-primary hover:underline transition-all">
              {t('changeLogo')}
            </button>
          </div>
          <div className="space-y-4">
            {schoolDetails.map(f => (
              <div key={f.label}>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">{f.label}</label>
                <input defaultValue={f.value} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Academic Settings */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card shadow-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-foreground font-heading">{t('gradingSystem')}</h3>
            </div>
            <div className="space-y-3">
              {gradingSystem.map(g => (
                <div key={g.grade} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors cursor-pointer group">
                  <span className={`text-lg font-bold font-heading w-6 ${g.color} group-hover:scale-110 transition-transform`}>{g.grade}</span>
                  <span className="text-sm text-foreground flex-1">{g.range}%</span>
                  <span className="badge-primary text-xs font-bold">{g.points} GPA</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-warning" />
              <h3 className="font-bold text-foreground font-heading">{t('notificationSettings')}</h3>
            </div>
            <div className="space-y-3">
              {notificationSettings.map(s => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0 hover:bg-muted/20 px-2 rounded-lg transition-colors">
                  <span className="text-sm text-foreground">{s.label}</span>
                  <div className={`w-10 h-5 rounded-full transition-all cursor-pointer flex items-center px-0.5 ${s.enabled ? "bg-accent justify-end shadow-inner" : "bg-muted justify-start"}`}>
                    <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={() => toast.success(t('settingsSaved'))} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-primary text-white font-semibold shadow-md-blue hover:shadow-lg-blue transition-all active:scale-95 leading-none">
          <Save className="w-4 h-4" /> {t('saveChanges')}
        </button>
      </div>
    </div>
  );
}
