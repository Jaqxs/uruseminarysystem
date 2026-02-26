import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import { BookOpen, Search, Plus, RotateCcw, Filter, MoreVertical, Star, Clock, Bookmark, ChevronRight, User, BookMarked, Download, CheckCircle2 } from "lucide-react";

export default function Library() {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState("");

  const books = [
    { id: "LIB-001", title: "Mathematics Form 4", author: "TIE Tanzania", copies: 45, available: 32, category: t('hisabati'), rating: 4.8, status: "available", color: "bg-blue-500" },
    { id: "LIB-002", title: "English Grammar Advanced", author: "Oxford Press", copies: 38, available: 0, category: t('kiingereza'), rating: 4.5, status: "all-borrowed", color: "bg-purple-500" },
    { id: "LIB-003", title: "Biology Practical Guide", author: "Longman EA", copies: 30, available: 18, category: t('baiolojia'), rating: 4.9, status: "available", color: "bg-green-500" },
    { id: "LIB-004", title: "History of East Africa", author: "Heinemann", copies: 25, available: 5, category: t('historia'), rating: 4.2, status: "low", color: "bg-amber-500" },
    { id: "LIB-005", title: "Physics Form 3 & 4", author: "TIE Tanzania", copies: 40, available: 22, category: t('fizikia'), rating: 4.7, status: "available", color: "bg-cyan-500" },
    { id: "LIB-006", title: "Kiswahili Literature", author: "Ben & Co", copies: 50, available: 41, category: t('kiswahiliSomo'), rating: 4.6, status: "available", color: "bg-rose-500" },
  ];

  const borrowed = [
    { student: "Amina Hassan", book: "Mathematics Form 4", date: "10 Jun 2024", due: "24 Jun 2024", status: "overdue", delay: `4 ${t('days')}` },
    { student: "Baraka Juma", book: "History of East Africa", date: "15 Jun 2024", due: "29 Jun 2024", status: "due-soon", delay: `2 ${t('days')}` },
    { student: "Fatuma Ali", book: "Biology Practical Guide", date: "20 Jun 2024", due: "04 Jul 2024", status: "active", delay: "--" },
    { student: "David Kamau", book: "Physics Form 3 & 4", date: "22 Jun 2024", due: "06 Jul 2024", status: "active", delay: "--" },
  ];

  const handleReturn = (student: string) => {
    toast.success(`${t('bookReturned')} ${student}`);
  };

  const handleAddBook = () => {
    toast.info(t('newBookForm'));
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('booksLabel'), value: "1,842", sub: `+12 ${language === 'sw' ? 'Leo' : 'Today'}`, gradient: "bg-gradient-card-blue", icon: BookOpen },
          { label: t('onShelf'), value: "1,204", sub: language === 'sw' ? "Kwenye rafu" : "On shelf", gradient: "bg-gradient-card-green", icon: CheckCircle2 },
          { label: t('borrowed'), value: "638", sub: t('borrowedThisYear'), gradient: "bg-gradient-card-amber", icon: RotateCcw },
          { label: t('overdue'), value: "23", sub: language === 'sw' ? "Vinahitaji rufaa" : "Needs attention", gradient: "bg-gradient-card-rose", icon: Clock },
        ].map((s, i) => (
          <div key={i} onClick={() => toast.info(`${t('loadingReport')} ${s.label.toLowerCase()}...`)} className="stat-card hover:shadow-xl transition-all cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.gradient} mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Book Catalog */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
            <div>
              <h3 className="text-lg font-bold font-heading text-foreground">{t('bookList')}</h3>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{t('catalog')}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border text-xs text-muted-foreground shadow-sm">
                <Search className="w-3.5 h-3.5" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('search')} className="bg-transparent outline-none w-24" />
              </div>
              <button onClick={handleAddBook} className="p-2 rounded-lg bg-gradient-primary text-white shadow-md hover:shadow-lg transition-all active:scale-95 leading-none">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {books.filter(b => b.title.toLowerCase().includes(search.toLowerCase())).map(b => (
              <div key={b.id} className="p-4 rounded-xl border border-border/60 hover:bg-muted/30 transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-16 rounded-lg ${b.color} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}>
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{b.title}</h4>
                        <p className="text-[10px] text-muted-foreground font-semibold uppercase">{b.author} • {b.category}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span className="text-[10px] font-black">{b.rating}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden shadow-inner">
                        <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${(b.available / b.copies) * 100}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground">{b.available}/{b.copies} {t('available')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full py-2.5 rounded-xl border border-dashed border-border text-xs font-bold text-muted-foreground hover:bg-muted transition-colors">
              {t('viewAll')}
            </button>
          </div>
        </div>

        {/* Circulation Section */}
        <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
            <h3 className="text-lg font-bold font-heading text-foreground">{t('circulation')}</h3>
            <button onClick={() => toast.info("Downloading...")} className="p-2 rounded-lg bg-background border border-border text-muted-foreground">
              <Download className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-border/30">
            {borrowed.map((b, i) => (
              <div key={i} className="p-4 flex items-center gap-3 hover:bg-muted/20 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  {b.student.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{b.student}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{b.book}</p>
                  <p className="text-[9px] font-bold text-rose-500 mt-0.5">{b.status === 'overdue' ? `${t('overdue')} ${b.delay}` : `Due ${b.due}`}</p>
                </div>
                <button onClick={() => handleReturn(b.student)} className="p-2 rounded-lg hover:bg-primary/20 text-primary transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border/30 bg-muted/20">
            <div className="p-3 rounded-xl bg-amber-500 text-white shadow-sm">
              <p className="text-[10px] font-bold uppercase opacity-80 mb-1">Alert</p>
              <h4 className="text-sm font-bold">12 {t('booksLabel')} Leo</h4>
              <button onClick={() => toast.success(t('smsSent'))} className="w-full mt-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-[10px] font-bold transition-all">{t('sendSMS')}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action */}
      <div className="p-6 rounded-2xl bg-primary text-white flex items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-heading">{t('digitalizeLibrary')}</h3>
          <p className="text-xs opacity-90">{t('scanBarcodes')}</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-white text-primary text-xs font-bold shadow-sm hover:scale-105 transition-all">{t('startScan')}</button>
      </div>
    </div>
  );
}

