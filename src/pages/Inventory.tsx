import { Package, Plus, Search, AlertTriangle, CheckCircle, Truck } from "lucide-react";

const items = [
  { id: "INV-001", name: "Kompyuta za Desktop", category: "Teknolojia", qty: 45, condition: "Nzuri", location: "Maabara ya ICT", lastCheck: "15 Jun 2024", status: "good" },
  { id: "INV-002", name: "Meza za Madarasani", category: "Samani", qty: 280, condition: "Nzuri", location: "Madarasa 1-12", lastCheck: "10 Jun 2024", status: "good" },
  { id: "INV-003", name: "Projekta za LCD", category: "Teknolojia", qty: 12, condition: "3 Zinahitaji Ukarabati", location: "Madarasa", lastCheck: "20 Jun 2024", status: "warning" },
  { id: "INV-004", name: "Vitabu vya Hisabati F4", category: "Vitabu", qty: 8, condition: "Pungufu", location: "Stoo ya Vitabu", lastCheck: "25 Jun 2024", status: "danger" },
  { id: "INV-005", name: "Vifaa vya Maabara", category: "Sayansi", qty: 156, condition: "Nzuri", location: "Maabara ya Sayansi", lastCheck: "18 Jun 2024", status: "good" },
  { id: "INV-006", name: "Viti vya Ofisi", category: "Samani", qty: 45, condition: "Nzuri", location: "Ofisi", lastCheck: "01 Jun 2024", status: "good" },
  { id: "INV-007", name: "Basi la Shule", category: "Magari", qty: 2, condition: "1 Inahitaji Huduma", location: "Gereji", lastCheck: "22 Jun 2024", status: "warning" },
  { id: "INV-008", name: "Vifaa vya Michezo", category: "Michezo", qty: 64, condition: "Nzuri", location: "Ghala la Michezo", lastCheck: "12 Jun 2024", status: "good" },
];

const categories = ["Wote", "Teknolojia", "Samani", "Vitabu", "Sayansi", "Magari", "Michezo"];

export default function Inventory() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Package, label: "Vitu Vyote", value: "248", gradient: "bg-gradient-card-blue" },
          { icon: CheckCircle, label: "Hali Nzuri", value: "198", gradient: "bg-gradient-card-green" },
          { icon: AlertTriangle, label: "Zinahitaji Ukaguzi", value: "38", gradient: "bg-gradient-card-amber" },
          { icon: Truck, label: "Zinaagizwa", value: "12", gradient: "bg-gradient-card-purple" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`w-10 h-10 rounded-xl ${s.gradient} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-border">
          <div className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/60 border border-border/50 text-sm text-muted-foreground">
            <Search className="w-4 h-4 flex-shrink-0" />
            <input placeholder="Tafuta bidhaa..." className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
          </div>
          <select className="px-3 py-2.5 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none">
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-md-blue">
            <Plus className="w-4 h-4" /> Bidhaa Mpya
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="sis-table">
            <thead>
              <tr>
                <th>Nambari</th>
                <th>Jina la Bidhaa</th>
                <th>Aina</th>
                <th>Idadi</th>
                <th>Hali</th>
                <th>Mahali</th>
                <th>Ukaguzi wa Mwisho</th>
                <th>Hali ya Jumla</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td><span className="font-mono text-xs font-semibold text-primary bg-primary-light px-2 py-1 rounded-lg">{item.id}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold text-foreground text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td><span className="badge-primary">{item.category}</span></td>
                  <td><span className="font-bold text-foreground text-sm">{item.qty}</span></td>
                  <td><span className="text-sm text-muted-foreground">{item.condition}</span></td>
                  <td><span className="text-xs text-muted-foreground">{item.location}</span></td>
                  <td><span className="text-xs text-muted-foreground">{item.lastCheck}</span></td>
                  <td>
                    <span className={item.status === "good" ? "badge-success" : item.status === "warning" ? "badge-warning" : "badge-danger"}>
                      {item.status === "good" ? "✓ Nzuri" : item.status === "warning" ? "⚠ Angalia" : "✗ Haraka"}
                    </span>
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
