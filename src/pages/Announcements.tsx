import { Bell, Plus, Search, Megaphone, Calendar } from "lucide-react";

const announcements = [
  { id: 1, title: "Mtihani wa Mwisho wa Term 2", content: "Mtihani wa mwisho wa Term 2 utaanza tarehe 15 Julai 2024. Wanafunzi wote wanahitajika kuwa tayari.", date: "25 Jun 2024", category: "Mtihani", priority: "high", author: "Mkurugenzi Hassan" },
  { id: 2, title: "Mkutano wa Wazazi – Darasa Form 4", content: "Wazazi wa wanafunzi wa Form 4 wanaalikwa kwenye mkutano maalum tarehe 30 Juni 2024 saa 3 asubuhi.", date: "23 Jun 2024", category: "Mkutano", priority: "high", author: "Afisa Elimu" },
  { id: 3, title: "Shughuli za Michezo – Jumamosi", content: "Shughuli za michezo za kila wiki zitafanyika Jumamosi tarehe 29 Juni 2024. Wanafunzi wote wanakaribishwa.", date: "22 Jun 2024", category: "Michezo", priority: "medium", author: "Mwalimu Mkuu wa Michezo" },
  { id: 4, title: "Ongezeko la Ada 2025", content: "Bodi ya shule imetangaza mabadiliko madogo ya muundo wa ada kwa mwaka wa masomo 2025/2026.", date: "20 Jun 2024", category: "Fedha", priority: "medium", author: "Afisa Fedha" },
  { id: 5, title: "Siku ya Wazi – Julai 20", content: "Shule itakuwa na Siku ya Wazi tarehe 20 Julai 2024. Wazazi na wananchi wanakaribishwa.", date: "18 Jun 2024", category: "Tukio", priority: "low", author: "Mkurugenzi Hassan" },
];

const priorityConfig: Record<string, { badge: string; dot: string }> = {
  high: { badge: "badge-danger", dot: "bg-destructive" },
  medium: { badge: "badge-warning", dot: "bg-warning" },
  low: { badge: "badge-info", dot: "bg-info" },
};
const categoryColors: Record<string, string> = {
  Mtihani: "badge-danger", Mkutano: "badge-primary", Michezo: "badge-success",
  Fedha: "badge-warning", Tukio: "badge-info",
};

export default function Announcements() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Matangazo Yote", value: "24", gradient: "bg-gradient-card-blue" },
          { label: "Ya Haraka", value: "5", gradient: "bg-gradient-card-rose" },
          { label: "Mwezi Huu", value: "12", gradient: "bg-gradient-card-green" },
        ].map(s => (
          <div key={s.label} className="stat-card text-center">
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-border">
          <Megaphone className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground font-heading">Matangazo Yote</h3>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/60 border border-border/50 text-sm text-muted-foreground">
              <Search className="w-4 h-4" />
              <input placeholder="Tafuta..." className="bg-transparent outline-none text-sm w-32" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue">
              <Plus className="w-4 h-4" /> Tangazo Jipya
            </button>
          </div>
        </div>
        <div className="divide-y divide-border/40">
          {announcements.map(a => (
            <div key={a.id} className="px-6 py-5 hover:bg-muted/20 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 ${priorityConfig[a.priority].dot}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="font-bold text-foreground font-heading">{a.title}</h4>
                    <span className={categoryColors[a.category]}>{a.category}</span>
                    <span className={priorityConfig[a.priority].badge}>
                      {a.priority === "high" ? "Haraka" : a.priority === "medium" ? "Wastani" : "Kawaida"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{a.date}</div>
                    <div className="flex items-center gap-1"><Bell className="w-3 h-3" />{a.author}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
