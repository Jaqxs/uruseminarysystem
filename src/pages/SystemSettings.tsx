import { Settings as SettingsIcon, School, Globe, Bell, Shield, Palette, Save } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* School Info */}
        <div className="rounded-2xl border border-border bg-card shadow-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <School className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground font-heading">Taarifa za Shule</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Jina la Shule", value: "Bender School" },
              { label: "Eneo", value: "Dar es Salaam, Tanzania" },
              { label: "Barua Pepe", value: "info@benderschool.ac.tz" },
              { label: "Simu", value: "+255 22 123 4567" },
              { label: "Mwaka wa Masomo", value: "2024/2025" },
              { label: "Term ya Sasa", value: "Term 2" },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">{f.label}</label>
                <input defaultValue={f.value} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            ))}
          </div>
        </div>

        {/* Academic Settings */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card shadow-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-foreground font-heading">Mfumo wa Alama</h3>
            </div>
            <div className="space-y-3">
              {[
                { grade: "A", range: "80 – 100", points: "4.0", color: "text-accent" },
                { grade: "B", range: "65 – 79", points: "3.0", color: "text-primary" },
                { grade: "C", range: "50 – 64", points: "2.0", color: "text-info" },
                { grade: "D", range: "40 – 49", points: "1.0", color: "text-warning" },
                { grade: "F", range: "0 – 39", points: "0.0", color: "text-destructive" },
              ].map(g => (
                <div key={g.grade} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                  <span className={`text-lg font-bold font-heading w-6 ${g.color}`}>{g.grade}</span>
                  <span className="text-sm text-foreground flex-1">{g.range}%</span>
                  <span className="badge-primary text-xs">{g.points} GPA</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-warning" />
              <h3 className="font-bold text-foreground font-heading">Mipangilio ya Arifa</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "Arifa za Mahudhurio (SMS)", enabled: true },
                { label: "Ukumbusho wa Ada", enabled: true },
                { label: "Matokeo ya Mtihani", enabled: true },
                { label: "Matangazo ya Jumla", enabled: false },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                  <span className="text-sm text-foreground">{s.label}</span>
                  <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer flex items-center px-0.5 ${s.enabled ? "bg-accent justify-end" : "bg-muted justify-start"}`}>
                    <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-primary text-white font-semibold shadow-md-blue hover:shadow-lg-blue transition-all hover:-translate-y-0.5">
          <Save className="w-4 h-4" /> Hifadhi Mabadiliko
        </button>
      </div>
    </div>
  );
}
