import { Clock, Plus, Download } from "lucide-react";

const days = ["Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa"];
const periods = ["7:30 - 8:30", "8:30 - 9:30", "9:30 - 10:30", "10:30 - 11:30", "11:30 - 12:30", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00"];

const colors: Record<string, string> = {
  "Hisabati": "bg-primary-light text-primary border-primary/20",
  "Kiingereza": "bg-accent-light text-accent border-accent/20",
  "Sayansi": "bg-info-light text-info border-info/20",
  "Kiswahili": "bg-warning-light text-warning border-warning/20",
  "Historia": "bg-destructive-light text-destructive border-destructive/20",
  "Jiografia": "bg-purple-50 text-purple-600 border-purple-200",
  "ICT": "bg-teal-50 text-teal-600 border-teal-200",
  "Fizikia": "bg-orange-50 text-orange-600 border-orange-200",
  "Mapumziko": "bg-muted text-muted-foreground border-border",
  "Chakula": "bg-muted text-muted-foreground border-border",
};

const schedule: Record<string, Record<string, { subject: string; teacher: string }>> = {
  "7:30 - 8:30": { "Jumatatu": { subject: "Hisabati", teacher: "Mwl. Kamau" }, "Jumanne": { subject: "Kiingereza", teacher: "Mwl. Grace" }, "Jumatano": { subject: "Sayansi", teacher: "Mwl. David" }, "Alhamisi": { subject: "Historia", teacher: "Mwl. Fatuma" }, "Ijumaa": { subject: "ICT", teacher: "Mwl. Amos" } },
  "8:30 - 9:30": { "Jumatatu": { subject: "Kiswahili", teacher: "Mwl. Amina" }, "Jumanne": { subject: "Hisabati", teacher: "Mwl. Kamau" }, "Jumatano": { subject: "Kiingereza", teacher: "Mwl. Grace" }, "Alhamisi": { subject: "Jiografia", teacher: "Mwl. Baraka" }, "Ijumaa": { subject: "Sayansi", teacher: "Mwl. David" } },
  "9:30 - 10:30": { "Jumatatu": { subject: "Sayansi", teacher: "Mwl. David" }, "Jumanne": { subject: "Historia", teacher: "Mwl. Fatuma" }, "Jumatano": { subject: "Hisabati", teacher: "Mwl. Kamau" }, "Alhamisi": { subject: "ICT", teacher: "Mwl. Amos" }, "Ijumaa": { subject: "Kiswahili", teacher: "Mwl. Amina" } },
  "10:30 - 11:30": { "Jumatatu": { subject: "Mapumziko", teacher: "" }, "Jumanne": { subject: "Mapumziko", teacher: "" }, "Jumatano": { subject: "Mapumziko", teacher: "" }, "Alhamisi": { subject: "Mapumziko", teacher: "" }, "Ijumaa": { subject: "Mapumziko", teacher: "" } },
  "11:30 - 12:30": { "Jumatatu": { subject: "ICT", teacher: "Mwl. Amos" }, "Jumanne": { subject: "Fizikia", teacher: "Mwl. Hassan" }, "Jumatano": { subject: "Jiografia", teacher: "Mwl. Baraka" }, "Alhamisi": { subject: "Hisabati", teacher: "Mwl. Kamau" }, "Ijumaa": { subject: "Historia", teacher: "Mwl. Fatuma" } },
  "13:00 - 14:00": { "Jumatatu": { subject: "Chakula", teacher: "" }, "Jumanne": { subject: "Chakula", teacher: "" }, "Jumatano": { subject: "Chakula", teacher: "" }, "Alhamisi": { subject: "Chakula", teacher: "" }, "Ijumaa": { subject: "Chakula", teacher: "" } },
  "14:00 - 15:00": { "Jumatatu": { subject: "Fizikia", teacher: "Mwl. Hassan" }, "Jumanne": { subject: "Kiswahili", teacher: "Mwl. Amina" }, "Jumatano": { subject: "ICT", teacher: "Mwl. Amos" }, "Alhamisi": { subject: "Sayansi", teacher: "Mwl. David" }, "Ijumaa": { subject: "Jiografia", teacher: "Mwl. Baraka" } },
  "15:00 - 16:00": { "Jumatatu": { subject: "Historia", teacher: "Mwl. Fatuma" }, "Jumanne": { subject: "Jiografia", teacher: "Mwl. Baraka" }, "Jumatano": { subject: "Fizikia", teacher: "Mwl. Hassan" }, "Alhamisi": { subject: "Kiingereza", teacher: "Mwl. Grace" }, "Ijumaa": { subject: "Hisabati", teacher: "Mwl. Kamau" } },
};

export default function Timetable() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todaySwahili: Record<string, string> = { Monday: "Jumatatu", Tuesday: "Jumanne", Wednesday: "Jumatano", Thursday: "Alhamisi", Friday: "Ijumaa" };
  const activeDay = todaySwahili[today] || "Jumatatu";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-light text-primary text-sm font-semibold">
          <Clock className="w-4 h-4" /> Leo: {activeDay}
        </div>
        <select className="px-3 py-2 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none">
          {["Form 1A","Form 2A","Form 3A","Form 4A"].map(c => <option key={c}>{c}</option>)}
        </select>
        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background text-sm font-medium hover:bg-muted transition-colors">
            <Download className="w-4 h-4" /> Chapisha Ratiba
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue">
            <Plus className="w-4 h-4" /> Ongeza Somo
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-bold text-muted-foreground bg-muted border-b border-border w-32">Muda</th>
                {days.map(d => (
                  <th key={d} className={`py-3 px-4 text-xs uppercase tracking-wider font-bold border-b border-border text-center ${d === activeDay ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map(period => (
                <tr key={period} className="border-b border-border/40 last:border-0">
                  <td className="py-3 px-4 bg-muted/30">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs font-semibold text-muted-foreground">{period}</span>
                    </div>
                  </td>
                  {days.map(day => {
                    const cell = schedule[period]?.[day];
                    const isBreak = cell?.subject === "Mapumziko" || cell?.subject === "Chakula";
                    const colorClass = cell ? colors[cell.subject] || "bg-muted text-muted-foreground" : "bg-transparent";
                    const isToday = day === activeDay;
                    return (
                      <td key={day} className={`py-2 px-3 ${isToday ? "bg-primary-light/30" : ""}`}>
                        {cell && (
                          <div className={`rounded-xl px-3 py-2 border text-center ${colorClass} ${isBreak ? "opacity-60" : ""}`}>
                            <p className="font-bold text-xs">{cell.subject}</p>
                            {cell.teacher && <p className="text-[10px] opacity-70 mt-0.5">{cell.teacher}</p>}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(colors).filter(([k]) => !["Mapumziko","Chakula"].includes(k)).map(([subject, cls]) => (
          <div key={subject} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${cls}`}>
            {subject}
          </div>
        ))}
      </div>
    </div>
  );
}
