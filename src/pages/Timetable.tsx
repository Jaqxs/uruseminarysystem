import { useLanguage } from "../context/LanguageContext";
import { Clock, Plus, Download } from "lucide-react";
import { toast } from "sonner";

export default function Timetable() {
  const { t } = useLanguage();

  const days = [t('Monday'), t('Tuesday'), t('Wednesday'), t('Thursday'), t('Friday')];
  const periods = ["7:30 - 8:30", "8:30 - 9:30", "9:30 - 10:30", "10:30 - 11:30", "11:30 - 12:30", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00"];

  const colors: Record<string, string> = {
    [t('hisabati')]: "bg-primary-light text-primary border-primary/20",
    [t('kiingereza')]: "bg-accent-light text-accent border-accent/20",
    [t('scienceLabel')]: "bg-info-light text-info border-info/20",
    [t('kiswahiliSomo')]: "bg-warning-light text-warning border-warning/20",
    [t('historia')]: "bg-destructive-light text-destructive border-destructive/20",
    [t('geography')]: "bg-purple-50 text-purple-600 border-purple-200",
    [t('ict')]: "bg-teal-50 text-teal-600 border-teal-200",
    [t('fizikia')]: "bg-orange-50 text-orange-600 border-orange-200",
    [t('breakLabel')]: "bg-muted text-muted-foreground border-border",
    [t('lunchLabel')]: "bg-muted text-muted-foreground border-border",
  };

  const schedule: Record<string, Record<string, { subject: string; teacher: string }>> = {
    "7:30 - 8:30": { [t('Monday')]: { subject: t('hisabati'), teacher: `${t('teacherAbbr')} Kamau` }, [t('Tuesday')]: { subject: t('kiingereza'), teacher: `${t('teacherAbbr')} Grace` }, [t('Wednesday')]: { subject: t('scienceLabel'), teacher: `${t('teacherAbbr')} David` }, [t('Thursday')]: { subject: t('historia'), teacher: `${t('teacherAbbr')} Fatuma` }, [t('Friday')]: { subject: t('ict'), teacher: `${t('teacherAbbr')} Amos` } },
    "8:30 - 9:30": { [t('Monday')]: { subject: t('kiswahiliSomo'), teacher: `${t('teacherAbbr')} Amina` }, [t('Tuesday')]: { subject: t('hisabati'), teacher: `${t('teacherAbbr')} Kamau` }, [t('Wednesday')]: { subject: t('kiingereza'), teacher: `${t('teacherAbbr')} Grace` }, [t('Thursday')]: { subject: t('geography'), teacher: `${t('teacherAbbr')} Baraka` }, [t('Friday')]: { subject: t('scienceLabel'), teacher: `${t('teacherAbbr')} David` } },
    "9:30 - 10:30": { [t('Monday')]: { subject: t('scienceLabel'), teacher: `${t('teacherAbbr')} David` }, [t('Tuesday')]: { subject: t('historia'), teacher: `${t('teacherAbbr')} Fatuma` }, [t('Wednesday')]: { subject: t('hisabati'), teacher: `${t('teacherAbbr')} Kamau` }, [t('Thursday')]: { subject: t('ict'), teacher: `${t('teacherAbbr')} Amos` }, [t('Friday')]: { subject: t('kiswahiliSomo'), teacher: `${t('teacherAbbr')} Amina` } },
    "10:30 - 11:30": { [t('Monday')]: { subject: t('breakLabel'), teacher: "" }, [t('Tuesday')]: { subject: t('breakLabel'), teacher: "" }, [t('Wednesday')]: { subject: t('breakLabel'), teacher: "" }, [t('Thursday')]: { subject: t('breakLabel'), teacher: "" }, [t('Friday')]: { subject: t('breakLabel'), teacher: "" } },
    "11:30 - 12:30": { [t('Monday')]: { subject: t('ict'), teacher: `${t('teacherAbbr')} Amos` }, [t('Tuesday')]: { subject: t('fizikia'), teacher: `${t('teacherAbbr')} Hassan` }, [t('Wednesday')]: { subject: t('geography'), teacher: `${t('teacherAbbr')} Baraka` }, [t('Thursday')]: { subject: t('hisabati'), teacher: `${t('teacherAbbr')} Kamau` }, [t('Friday')]: { subject: t('historia'), teacher: `${t('teacherAbbr')} Fatuma` } },
    "13:00 - 14:00": { [t('Monday')]: { subject: t('lunchLabel'), teacher: "" }, [t('Tuesday')]: { subject: t('lunchLabel'), teacher: "" }, [t('Wednesday')]: { subject: t('lunchLabel'), teacher: "" }, [t('Thursday')]: { subject: t('lunchLabel'), teacher: "" }, [t('Friday')]: { subject: t('lunchLabel'), teacher: "" } },
    "14:00 - 15:00": { [t('Monday')]: { subject: t('fizikia'), teacher: `${t('teacherAbbr')} Hassan` }, [t('Tuesday')]: { subject: t('kiswahiliSomo'), teacher: `${t('teacherAbbr')} Amina` }, [t('Wednesday')]: { subject: t('ict'), teacher: `${t('teacherAbbr')} Amos` }, [t('Thursday')]: { subject: t('scienceLabel'), teacher: `${t('teacherAbbr')} David` }, [t('Friday')]: { subject: t('geography'), teacher: `${t('teacherAbbr')} Baraka` } },
    "15:00 - 16:00": { [t('Monday')]: { subject: t('historia'), teacher: `${t('teacherAbbr')} Fatuma` }, [t('Tuesday')]: { subject: t('geography'), teacher: `${t('teacherAbbr')} Baraka` }, [t('Wednesday')]: { subject: t('fizikia'), teacher: `${t('teacherAbbr')} Hassan` }, [t('Thursday')]: { subject: t('kiingereza'), teacher: `${t('teacherAbbr')} Grace` }, [t('Friday')]: { subject: t('hisabati'), teacher: `${t('teacherAbbr')} Kamau` } },
  };

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const activeDayEnToLocal: Record<string, string> = {
    Monday: t('Monday'),
    Tuesday: t('Tuesday'),
    Wednesday: t('Tuesday'),
    Thursday: t('Thursday'),
    Friday: t('Friday')
  };
  const activeDay = activeDayEnToLocal[today] || t('Monday');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-light text-primary text-sm font-semibold shadow-sm">
          <Clock className="w-4 h-4" /> {t('todayLabel')}: {activeDay}
        </div>
        <select className="px-3 py-2 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer transition-all pr-8">
          {["Form 1A", "Form 2A", "Form 3A", "Form 4A"].map(c => <option key={c}>{c}</option>)}
        </select>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => toast.promise(new Promise(r => setTimeout(r, 1500)), { loading: t('preparingTimetable'), success: t('timetableDownloaded'), error: "Error" })} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background text-sm font-medium hover:bg-muted transition-all active:scale-95">
            <Download className="w-4 h-4" /> {t('printTimetable')}
          </button>
          <button onClick={() => toast.info(t('addSubjectForm'))} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue hover:shadow-lg-blue transition-all active:scale-95 leading-none">
            <Plus className="w-4 h-4" /> {t('addSubject')}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr>
                <th className="text-left py-4 px-6 text-[10px] uppercase tracking-widest font-bold text-muted-foreground bg-muted/50 border-b border-border w-40">{t('timeLabel')}</th>
                {days.map(d => (
                  <th key={d} className={`py-4 px-6 text-[10px] uppercase tracking-widest font-bold border-b border-border text-center transition-colors ${d === activeDay ? "bg-primary text-white shadow-inner" : "bg-muted/50 text-muted-foreground"}`}>
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map(period => (
                <tr key={period} className="border-b border-border/40 last:border-0 hover:bg-muted/5 transition-colors">
                  <td className="py-4 px-6 bg-muted/20">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground/60" />
                      <span className="text-xs font-bold text-muted-foreground">{period}</span>
                    </div>
                  </td>
                  {days.map(day => {
                    const cell = schedule[period]?.[day];
                    const isBreak = cell?.subject === t('breakLabel') || cell?.subject === t('lunchLabel');
                    const colorClass = cell ? colors[cell.subject] || "bg-muted text-muted-foreground" : "bg-transparent";
                    const isToday = day === activeDay;
                    return (
                      <td key={day} onClick={() => cell && toast.info(`${t('lessonWith')} ${cell.subject} ${t('andTeacher')} ${cell.teacher || t('teacherLabel')}...`)} className={`py-2 px-3 transition-colors ${isToday ? "bg-primary-light/10" : ""} ${cell ? "cursor-pointer group" : ""}`}>
                        {cell && (
                          <div className={`rounded-xl px-3 py-2.5 border text-center transition-all ${colorClass} ${isBreak ? "opacity-50 grayscale-[0.5]" : "shadow-sm group-hover:shadow-md group-hover:-translate-y-1"}`}>
                            <p className="font-bold text-xs font-heading">{cell.subject}</p>
                            {cell.teacher && <p className="text-[10px] font-semibold opacity-70 mt-1">{cell.teacher}</p>}
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
      <div className="flex flex-wrap gap-2 pt-2">
        {Object.entries(colors).filter(([k]) => ![t('breakLabel'), t('lunchLabel')].includes(k)).map(([subject, cls]) => (
          <div key={subject} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-wider shadow-sm transition-transform hover:scale-105 ${cls}`}>
            <div className={`w-1.5 h-1.5 rounded-full bg-current`} />
            {subject}
          </div>
        ))}
      </div>
    </div>
  );
}
