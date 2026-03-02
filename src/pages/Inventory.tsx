import { useState } from "react";
import { Package, Plus, Search, AlertTriangle, CheckCircle, Truck, MoreVertical, Building2, MapPin, History, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

const initialItems = [
  { id: "INV-001", name: "Desktop Computers", category: "Technology", qty: 45, condition: "Good", location: "ICT Lab", lastCheck: "15 Jun 2024", status: "good" },
  { id: "INV-002", name: "Classroom Desks", category: "Furniture", qty: 280, condition: "Good", location: "Classes 1-12", lastCheck: "10 Jun 2024", status: "good" },
  { id: "INV-003", name: "LCD Projectors", category: "Technology", qty: 12, condition: "3 Need Repair", location: "Classrooms", lastCheck: "20 Jun 2024", status: "warning" },
  { id: "INV-004", name: "Math Books F4", category: "Books", qty: 8, condition: "Low Stock", location: "Book Store", lastCheck: "25 Jun 2024", status: "danger" },
  { id: "INV-005", name: "Lab Equipment", category: "Science", qty: 156, condition: "Good", location: "Science Lab", lastCheck: "18 Jun 2024", status: "good" },
  { id: "INV-006", name: "Office Chairs", category: "Furniture", qty: 45, condition: "Good", location: "Office", lastCheck: "01 Jun 2024", status: "good" },
  { id: "INV-007", name: "School Bus", category: "Vehicles", qty: 2, condition: "1 Needs Service", location: "Garage", lastCheck: "22 Jun 2024", status: "warning" },
  { id: "INV-008", name: "Sports Gear", category: "Sports", qty: 64, condition: "Good", location: "Sports Store", lastCheck: "12 Jun 2024", status: "good" },
];

export default function Inventory() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const categories = [
    language === 'sw' ? "Wote" : "All",
    t('technology'),
    t('furniture'),
    t('books'),
    t('science'),
    t('vehicles'),
    t('sports')
  ];

  const [newItem, setNewItem] = useState({
    name: "", category: t('technology'), qty: 1, condition: "Mpya", location: "", status: "good"
  });

  const filtered = items.filter(item => {
    const matchesSearch = (item.name.toLowerCase().includes(search.toLowerCase()) || item.id.includes(search));
    const matchesCategory = (selectedCategory === "All" || selectedCategory === "Wote" || item.category === selectedCategory || t(item.category.toLowerCase()) === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `INV-${String(items.length + 1).padStart(3, '0')}`;
    const entry = { ...newItem, id, lastCheck: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) };
    setItems([entry as any, ...items]);
    setIsAddOpen(false);
    toast.success(t('addedToInventory'));
    setNewItem({ name: "", category: t('technology'), qty: 1, condition: "Mpya", location: "", status: "good" });
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
    toast.info(t('itemDeleted'));
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Stats Board */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Package, label: t('allItems'), value: items.reduce((acc, i) => acc + i.qty, 0), gradient: "bg-gradient-card-blue" },
          { icon: CheckCircle, label: t('goodCondition'), value: items.filter(i => i.status === 'good').length, gradient: "bg-gradient-card-green" },
          { icon: AlertTriangle, label: t('needsService'), value: items.filter(i => i.status !== 'good').length, gradient: "bg-gradient-card-amber" },
          { icon: Truck, label: t('itemCategories'), value: new Set(items.map(i => i.category)).size, gradient: "bg-gradient-card-purple" },
        ].map((s, i) => (
          <div key={i} onClick={() => toast.info(`${t('loadingReport')} ${s.label.toLowerCase()}...`)} className="stat-card hover:shadow-xl transition-all cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.gradient} mb-3 group-hover:scale-110 transition-transform`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-border bg-muted/20">
          <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2.5 rounded-xl bg-background border border-border shadow-sm text-sm text-muted-foreground focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search className="w-4 h-4 flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('searchInventory')}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {['admin', 'bursar'].includes(user?.role || '') && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue hover:shadow-lg-blue transition-all">
                  <Plus className="w-4 h-4" /> {t('add')}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md rounded-3xl p-8 text-foreground">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold font-heading">{t('newItem')}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
                  <Input required value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} placeholder={t('itemName')} className="rounded-xl border-border bg-background" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="number" required value={newItem.qty} onChange={e => setNewItem({ ...newItem, qty: parseInt(e.target.value) })} placeholder={t('quantity')} className="rounded-xl border-border bg-background" />
                    <Input required value={newItem.location} onChange={e => setNewItem({ ...newItem, location: e.target.value })} placeholder={t('location')} className="rounded-xl border-border bg-background" />
                  </div>
                  <DialogFooter className="mt-6">
                    <button type="submit" className="w-full py-3 rounded-2xl bg-gradient-primary text-white font-bold shadow-md transition-all">{t('save')}</button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="sis-table">
            <thead>
              <tr>
                <th>{t('itemID')}</th>
                <th>{t('itemLabel')}</th>
                <th>{t('category')}</th>
                <th>{t('quantity')}</th>
                <th>{t('status')}</th>
                <th>{t('location')}</th>
                <th className="text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-muted/30 group">
                  <td><span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-1 rounded-lg">{item.id}</span></td>
                  <td><span className="text-sm font-bold text-foreground">{item.name}</span></td>
                  <td><span className="badge-primary px-2">{t(item.category.toLowerCase())}</span></td>
                  <td><span className="text-sm font-black">{item.qty}</span></td>
                  <td>
                    <span className={item.status === "good" ? "badge-success" : "badge-warning"}>
                      {item.status === "good" ? t('good') : t('check')}
                    </span>
                  </td>
                  <td><span className="text-xs text-muted-foreground">{item.location}</span></td>
                  <td className="text-right">
                    <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded-lg hover:bg-destructive-light text-destructive transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

